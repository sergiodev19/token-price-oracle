import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, UnauthorizedError, IUserSchema } from '../utils';

/**
 * Middleware function to authorize users based on JWT.
 * @param req - The request object containing the JWT in the authorization header. Extends AuthRequest to include user information.
 * @param res - The response object used to send an error response if unauthorized.
 * @param next - The next middleware function in the stack, used to handle errors or proceed to the next middleware.
 * @returns Calls the next middleware function if authorization is successful, or sends an error response if unauthorized.
 */
export const authorize = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Check for the presence and format of the authorization header
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Unauthorized'));
  }

  try {
    // Extract the token from the authorization header
    const token = req.headers.authorization.split(' ')[1];
    // Verify the token using the JWT secret
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    // Attach the user payload to the request object
    req.user = payload as Partial<IUserSchema>;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Pass any errors to the next middleware with an UnauthorizedError
    next(new UnauthorizedError((error as unknown as Error).message));
  }
};
