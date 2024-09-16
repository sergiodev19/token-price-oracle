import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../utils';

/**
 * Middleware function to validate request data.
 * @param req - The request object containing the validation errors and parameters.
 * @param res - The response object used to send an error response if validation fails.
 * @param next - The next middleware function in the stack, used to handle errors or proceed to the next middleware.
 * @returns Calls the next middleware function if validation passes, or sends a BadRequestError if validation fails.
 */
export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Retrieve validation errors from the request
  const errors = validationResult(req);

  // If there are validation errors, send a BadRequestError with the first error message
  if (!errors.isEmpty()) {
    return next(new BadRequestError(errors.array()[0].msg));
  }

  // Check if the ID in the request parameters is a valid ObjectId
  if (req.params.id && !isValidObjectId(req.params.id)) {
    return next(new BadRequestError('Invalid id'));
  }

  // Proceed to the next middleware if validation is successful
  next();
};
