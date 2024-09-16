"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaValidator = void 0;
const EMAIL_REGEX = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';
const PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$';
exports.userSchemaValidator = {
    $jsonSchema: {
        bsonType: 'object',
        title: 'User Object Validation',
        required: ['name', 'email', 'password', 'created_at'],
        properties: {
            name: {
                minLength: 3,
                maxLength: 30,
                bsonType: 'string',
                description: "'name' must be a string and is required",
            },
            email: {
                bsonType: 'string',
                pattern: EMAIL_REGEX,
                description: "'email' must be a string and match the specified regex",
            },
            password: {
                bsonType: 'string',
                pattern: PASSWORD_REGEX,
                description: "'password' must be a string and match the specified regex",
            },
            created_at: {
                bsonType: 'date',
                description: "'date' must be a date and is required",
            },
            updated_at: {
                bsonType: 'date',
                description: "'date' must be a date and is optional",
            },
        },
    },
};
//# sourceMappingURL=validator.js.map