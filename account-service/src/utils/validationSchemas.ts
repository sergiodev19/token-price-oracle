import { Schema } from 'express-validator';

// Regular expression for validating email addresses
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regular expression for validating passwords (at least 8 characters, including uppercase, lowercase, number, and special character)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

/**
 * Validation schema for user data.
 * @type {Schema}
 * @property {Object} name - Validation rules for the user's name.
 * @property {Object} email - Validation rules for the user's email.
 * @property {Object} password - Validation rules for the user's password.
 */
export const userValidationSchema: Schema = {
  name: {
    isLength: {
      options: {
        min: 3, // Minimum length of the name
        max: 30, // Maximum length of the name
      },
      errorMessage: 'Name must be between 3 and 30 characters',
    },
    trim: true, // Trim whitespace from the name
    escape: true, // Escape characters to prevent XSS attacks
    isString: true, // Ensure the name is a string
    errorMessage: 'Name must be a string',
  },
  email: {
    isEmail: true, // Ensure the email is valid
    trim: true, // Trim whitespace from the email
    matches: {
      options: EMAIL_REGEX, // Regular expression for email validation
    },
    errorMessage: 'Please enter a valid email',
  },
  password: {
    matches: {
      options: PASSWORD_REGEX, // Regular expression for password validation
    },
    trim: true, // Trim whitespace from the password
    isString: true, // Ensure the password is a string
    errorMessage: 'Password must be a string and match the pattern',
  },
};
