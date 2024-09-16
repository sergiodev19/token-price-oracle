import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { errorHandler, NotFoundError } from './utils';
import { Mongoose, Redis } from './config';

/**
 * Handles uncaught exceptions and unhandled rejections.
 * @param err - The error object.
 * @param origin - The origin of the exception ('uncaughtException' or 'unhandledRejection').
 */
const handle = async (err: Error, origin: 'uncaughtException' | 'unhandledRejection') => {
  console.error(`Caught exception: ${err.stack}`);
  console.error(`Exception origin: ${origin}`);
};

// Register handlers for uncaught exceptions and unhandled rejections.
process.on('uncaughtException', handle);
process.on('unhandledRejection', handle);

(async () => {
  dotenv.config(); // Load environment variables from a .env file.

  const mongoose = Mongoose.getInstance();
  const redis = Redis.getInstance();

  // Gracefully handle process termination.
  process.on('SIGINT', async () => {
    await mongoose.disconnect();
    await redis.disconnect();
    process.exit(0);
  });

  try {
    const app = express();

    // Connect to MongoDB and Redis.
    await mongoose.connect();
    await redis.connect();

    // Set up rate limiting using Redis store.
    const limiter = rateLimit({
      windowMs: 1000, // 1 second window.
      max: 10, // Limit each IP to 10 requests per windowMs.
      standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers.
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
      store: new RedisStore({
        sendCommand: (...args: string[]) => redis.getClient().sendCommand(args),
      }),
    });

    app.use(limiter); // Apply rate limiting middleware.
    app.use(helmet()); // Apply security headers.
    app.use(cors()); // Enable CORS.
    app.use(express.json()); // Parse JSON bodies.
    app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies.

    // Import and apply routes.
    const { router } = await import('./routes');
    app.use('/api', router);

    // Handle 404 errors for routes that do not exist.
    app.all('*', (req, res, next) => {
      next(new NotFoundError('The route does not exist!'));
    });

    app.use(errorHandler); // Apply custom error handler.

    // Seed the database with supported data sources.
    const { insertSupportedDataSources } = await import('./utils/seed');
    await insertSupportedDataSources();

    // Start the server.
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error); // Log any errors.
    await mongoose.disconnect();
    await redis.disconnect();
    process.exit(1);
  }
})();
