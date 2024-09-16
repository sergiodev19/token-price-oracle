import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, UnauthorizedError, IUserSchema } from '../utils';

/**
 * Middleware to authorize requests by verifying JWT tokens.
 * @param req - The request object containing the authorization header.
 * @param req.headers.authorization - The authorization header containing the JWT token.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error or to proceed to the next middleware.
 * @returns Calls `next()` with an `UnauthorizedError` if the authorization header is missing or invalid,
 *          or if the token verification fails.
 * @throws UnauthorizedError if the token is missing, malformed, or verification fails.
 */
export const authorize = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Unauthorized'));
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = payload as Partial<IUserSchema>;

    next();
  } catch (error) {
    next(new UnauthorizedError((error as unknown as Error).message));
  }
};
