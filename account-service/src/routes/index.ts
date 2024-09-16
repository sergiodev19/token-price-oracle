import { Router } from 'express';
import AuthRouter from './auth';
import UserRouter from './users';

// Create a new router instance
const router = Router();

/**
 * Mount the authentication routes.
 * @param '/auth' - The base route for authentication-related endpoints.
 * @param AuthRouter - The router instance handling authentication routes (e.g., login, register).
 */
router.use('/auth', AuthRouter);

/**
 * Mount the user management routes.
 * @param '/users' - The base route for user-related endpoints.
 * @param UserRouter - The router instance handling user management routes (e.g., user profile, user details).
 */
router.use('/users', UserRouter);

export { router };
