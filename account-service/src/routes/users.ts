import { Router } from 'express';
import { getUserById } from '../controllers';
import { authorize, validationMiddleware } from '../middlewares';

// Create a new router instance
const router = Router();

/**
 * Route to retrieve a user by their ID.
 * @param '/:id' - The endpoint for retrieving a user by their ID, where ':id' is the user ID parameter.
 * @param validationMiddleware - Middleware to validate the ID and handle validation errors.
 * @param authorize - Middleware to check if the request is authorized using JWT.
 * @param getUserById - Controller function to handle the retrieval of the user by ID.
 */
router.get('/:id', validationMiddleware, authorize, getUserById);

export default router;
