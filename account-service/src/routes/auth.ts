import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { loginUser, registerUser } from '../controllers';
import { userValidationSchema } from '../utils';
import { validationMiddleware } from '../middlewares';

// Create a new router instance
const router = Router();

/**
 * Route to register a new user.
 * @param '/register' - The endpoint for user registration.
 * @param checkSchema(userValidationSchema) - Middleware to validate the registration data against the schema.
 * @param validationMiddleware - Middleware to handle validation errors and additional checks.
 * @param registerUser - Controller function to handle user registration.
 */
router.post('/register', checkSchema(userValidationSchema), validationMiddleware, registerUser);

/**
 * Route to log in an existing user.
 * @param '/login' - The endpoint for user login.
 * @param checkSchema - Middleware to validate the login data against the schema.
 * @param validationMiddleware - Middleware to handle validation errors and additional checks.
 * @param loginUser - Controller function to handle user login.
 */
router.post(
  '/login',
  checkSchema({
    email: userValidationSchema.email,
    password: userValidationSchema.password,
  }),
  validationMiddleware,
  loginUser,
);

export default router;
