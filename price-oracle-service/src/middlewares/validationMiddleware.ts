import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { BadRequestError } from '../utils';

/**
 * Middleware to validate request data and parameters.
 * This middleware performs two main validations:
 * 1. Checks if there are any validation errors from `express-validator`.
 * 2. Validates if the `id` parameter (if present) is a valid MongoDB ObjectId.
 * @param req - The request object containing request data and parameters.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error or to proceed to the next middleware.
 * @returns Calls `next()` with a `BadRequestError` if there are validation errors or if the `id` is invalid.
 * @throws BadRequestError if validation errors are present or if `id` is not a valid ObjectId.
 */
export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new BadRequestError(errors.array()[0].msg));
  }

  if (req.params.id && !isValidObjectId(req.params.id)) {
    return next(new BadRequestError('Invalid id'));
  }

  next();
};
