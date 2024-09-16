import { NextFunction, Request, Response } from 'express';
import { UsersModel } from '../models';
import {
  BadRequestError,
  generateToken,
  NotFoundError,
  IUserSchema,
  generatePasswordHash,
  comparePassword,
} from '../utils';

/**
 * Registers a new user.
 * @param req - The request object containing the user details in the body.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function in the stack, used to handle errors.
 * @returns A promise that resolves when the user is registered.
 */
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    // Check if a user with the given email already exists
    const userExists = await UsersModel.findOne({ email }).exec();

    if (userExists) {
      throw new BadRequestError(`User already exists with this email ${email}`);
    }

    // Create a new user object
    const user = {
      name,
      email,
      password: await generatePasswordHash(password),
      createdAt: new Date(),
      updatedAt: null,
    } as IUserSchema;

    // Save the new user to the database
    const result = new UsersModel(user).save();

    res.status(201).json(result);
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
};

/**
 * Logs in an existing user.
 * @param req - The request object containing the user credentials in the body.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function in the stack, used to handle errors.
 * @returns A promise that resolves when the user is logged in and a token is generated.
 */
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UsersModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundError(`User with this email ${email} not found`);
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestError('Invalid password');
    }

    // Create a payload for the JWT token
    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // Respond with the token and user details
    res.status(200).json({
      ...tokenPayload,
      token: generateToken(tokenPayload),
    });
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
};
