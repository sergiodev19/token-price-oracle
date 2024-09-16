import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { router } from './routes';
import { errorHandler, NotFoundError } from './utils';
import { Mongoose, Redis } from './config';

/**
 * Handles uncaught exceptions and unhandled promise rejections.
 * @param err - The error that was thrown.
 * @param origin - The origin of the exception, either 'uncaughtException' or 'unhandledRejection'.
 */
const handle = async (err: Error, origin: 'uncaughtException' | 'unhandledRejection') => {
  console.error(`Caught exception: ${err.stack}`);
  console.error(`Exception origin: ${origin}`);
};

// Set up global error handlers for uncaught exceptions and unhandled rejections
process.on('uncaughtException', handle);
process.on('unhandledRejection', handle);

(async () => {
  dotenv.config();

  // Initialize database and cache instances
  const mongoose = Mongoose.getInstance();
  const redis = Redis.getInstance();

  // Graceful shutdown on SIGINT (Ctrl+C)
  process.on('SIGINT', async () => {
    await mongoose.disconnect();
    await redis.disconnect();
    process.exit(0);
  });

  try {
    const app = express();

    // Connect to the database and cache
    await mongoose.connect();
    await redis.connect();

    // Set up rate limiting with Redis store
    const limiter = rateLimit({
      windowMs: 1000, // 1 minutes
      max: 10, // Limit each IP to 10 requests per windowMs
      standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      store: new RedisStore({
        sendCommand: (...args: string[]) => redis.getClient().sendCommand(args),
      }),
    });

    // Middleware setup
    app.use(limiter); // Apply rate limiting
    app.use(helmet()); // Add security headers
    app.use(cors()); // Enable CORS
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

    // Define routes
    app.use('/api', router); // Main API router
    app.all('*', (req, res, next) => {
      next(new NotFoundError('The route does not exist!'));
    });
    app.use(errorHandler); // Global error handler

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
    await mongoose.disconnect();
    await redis.disconnect();
    process.exit(1);
  }
})();
