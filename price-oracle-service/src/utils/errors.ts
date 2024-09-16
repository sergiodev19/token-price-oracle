import { NextFunction, Request, Response } from 'express';

/**
 * Base class for custom errors.
 * @class
 * @extends Error
 */
class BaseError extends Error {
  public statusCode: number;

  /**
   * Creates an instance of BaseError.
   * @param {string} name - The name of the error.
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {string} [message=''] - The error message.
   */
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
 * Error class for bad requests (HTTP 400).
 * @class
 * @extends BaseError
 */
export class BadRequestError extends BaseError {
  /**
   * Creates an instance of BadRequestError.
   * @param {string} [message=''] - The error message.
   */
  constructor(message?: string) {
    super('BadRequestError', 400, message);
  }
}

/**
 * Error class for unauthorized requests (HTTP 401).
 * @class
 * @extends BaseError
 */
export class UnauthorizedError extends BaseError {
  /**
   * Creates an instance of UnauthorizedError.
   * @param {string} [message=''] - The error message.
   */
  constructor(message?: string) {
    super('UnauthorizedError', 401, message);
  }
}

/**
 * Error class for forbidden requests (HTTP 403).
 * @class
 * @extends BaseError
 */
export class ForbiddenError extends BaseError {
  /**
   * Creates an instance of ForbiddenError.
   * @param {string} [message=''] - The error message.
   */
  constructor(message?: string) {
    super('ForbiddenError', 403, message);
  }
}

/**
 * Error class for not found errors (HTTP 404).
 * @class
 * @extends BaseError
 */
export class NotFoundError extends BaseError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} [message=''] - The error message.
   */
  constructor(message?: string) {
    super('NotFoundError', 404, message);
  }
}

/**
 * Error class for general API errors (HTTP 405).
 * @class
 * @extends BaseError
 */
export class APIError extends BaseError {
  /**
   * Creates an instance of APIError.
   * @param {string} [message=''] - The error message.
   */
  constructor(message?: string) {
    super('APIError', 405, message);
  }
}

/**
 * Error class for internal server errors (HTTP 500).
 * @class
 * @extends BaseError
 */
export class InternalError extends BaseError {
  /**
   * Creates an instance of InternalError.
   * @param {string} [message=''] - The error message.
   */
  constructor(message?: string) {
    super('InternalError', 500, message);
  }
}

/**
 * Express middleware for handling errors.
 * @param {BaseError} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns {Response} - The Express response with the error message.
 */
export const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;
  return res.status(statusCode || 500).json({ error: message });
};
