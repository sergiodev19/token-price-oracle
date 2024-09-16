import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { UsersModel } from '../models';
import { NotFoundError } from '../utils';

/**
 * Retrieves a user by their ID.
 * @param req - The request object containing the user ID in the URL parameters.
 * @param res - The response object used to send the user data or an error response.
 * @param next - The next middleware function in the stack, used to handle errors.
 * @returns A promise that resolves with the user data if found, or an error if not.
 */
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  // Convert the ID from the request parameters to a Mongoose ObjectId
  const id = new Types.ObjectId(req.params.id);

  try {
    // Find the user by ID, excluding the password field
    const user = await UsersModel.findById(id, '-password').exec();

    if (!user) {
      throw new NotFoundError(`User does not exist with this id ${req.params.id}`);
    }

    // Send the user data in the response
    res.status(200).json(user);
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
};
