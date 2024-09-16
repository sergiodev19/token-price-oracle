import { NextFunction, Request, Response } from 'express';

/**
 * Base class for custom HTTP errors.
 * @param name - The name of the error type.
 * @param statusCode - The HTTP status code associated with the error.
 * @param message - An optional error message.
 */
class BaseError extends Error {
  public statusCode: number;

  constructor(name: string, statusCode: number, message: string = '') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this);
  }
}

/**
 * Error class for HTTP 400 Bad Request.
 * @param message - An optional error message.
 */
export class BadRequestError extends BaseError {
  constructor(message?: string) {
    super('BadRequestError', 400, message);
  }
}

/**
 * Error class for HTTP 401 Unauthorized.
 * @param message - An optional error message.
 */
export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super('UnauthorizedError', 401, message);
  }
}

/**
 * Error class for HTTP 403 Forbidden.
 * @param message - An optional error message.
 */
export class ForbiddenError extends BaseError {
  constructor(message?: string) {
    super('ForbiddenError', 403, message);
  }
}

/**
 * Error class for HTTP 404 Not Found.
 * @param message - An optional error message.
 */
export class NotFoundError extends BaseError {
  constructor(message?: string) {
    super('NotFoundError', 404, message);
  }
}

/**
 * Error class for HTTP 405 Method Not Allowed.
 * @param message - An optional error message.
 */
export class APIError extends BaseError {
  constructor(message?: string) {
    super('APIError', 405, message);
  }
}

/**
 * Error class for HTTP 500 Internal Server Error.
 * @param message - An optional error message.
 */
export class InternalError extends BaseError {
  constructor(message?: string) {
    super('InternalError', 500, message);
  }
}

/**
 * Express error handling middleware.
 * @param err - The error object to handle, extending BaseError.
 * @param req - The request object.
 * @param res - The response object used to send the error response.
 * @param next - The next middleware function in the stack.
 * @returns A JSON response with the error message and status code.
 */
export const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  return res.status(statusCode || 500).json({ error: message });
};
