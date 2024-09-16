"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.InternalError = exports.APIError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = void 0;
class BaseError extends Error {
    constructor(name, statusCode, message = '') {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this);
    }
}
class BadRequestError extends BaseError {
    constructor(message) {
        super('BadRequestError', 400, message);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends BaseError {
    constructor(message) {
        super('UnauthorizedError', 401, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends BaseError {
    constructor(message) {
        super('ForbiddenError', 403, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends BaseError {
    constructor(message) {
        super('NotFoundError', 404, message);
    }
}
exports.NotFoundError = NotFoundError;
class APIError extends BaseError {
    constructor(message) {
        super('APIError', 405, message);
    }
}
exports.APIError = APIError;
class InternalError extends BaseError {
    constructor(message) {
        super('InternalError', 500, message);
    }
}
exports.InternalError = InternalError;
const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = err;
    return res.status(statusCode || 500).json({ error: message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errors.js.map