import jwt from 'jsonwebtoken';
import { IUserSchema } from './types';

/**
 * Generates a JSON Web Token (JWT) for the user.
 * @param userData - The user data to be included in the token payload. This is a partial representation of IUserSchema.
 * @returns A signed JWT containing the user data.
 */
export const generateToken = (userData: Partial<IUserSchema>) => {
  return jwt.sign(userData, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION_PERIOD,
  });
};
