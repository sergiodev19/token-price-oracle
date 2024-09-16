import { NextFunction, Request, Response } from 'express';
declare class BaseError extends Error {
    statusCode: number;
    constructor(name: string, statusCode: number, message?: string);
}
export declare class BadRequestError extends BaseError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends BaseError {
    constructor(message?: string);
}
export declare class ForbiddenError extends BaseError {
    constructor(message?: string);
}
export declare class NotFoundError extends BaseError {
    constructor(message?: string);
}
export declare class APIError extends BaseError {
    constructor(message?: string);
}
export declare class InternalError extends BaseError {
    constructor(message?: string);
}
export declare const errorHandler: (err: BaseError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=errors.d.ts.map