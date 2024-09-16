"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
exports.userValidationSchema = {
    name: {
        isLength: {
            options: {
                min: 3,
                max: 30,
            },
            errorMessage: `Name must be between 3 and 30 characters`,
        },
        trim: true,
        escape: true,
        isString: true,
        errorMessage: 'Name must be a string',
    },
    email: {
        isEmail: true,
        trim: true,
        matches: {
            options: EMAIL_REGEX,
        },
        errorMessage: 'Please enter a valid email',
    },
    password: {
        matches: {
            options: PASSWORD_REGEX,
        },
        trim: true,
        isString: true,
        errorMessage: 'Password must be a string and match the pattern',
    },
};
//# sourceMappingURL=validationSchemas.js.map