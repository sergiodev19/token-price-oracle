import { Schema } from 'express-validator';
import { SupportedDataSources } from './types';

// Regular expression to validate symbols (uppercase letters only).
const SYMBOL_REGEXP = /^[A-Z]+$/;

/**
 * Validation rules for token pair symbols.
 */
export const symbolValidation = {
  isLength: {
    options: {
      min: 3,
      max: 10,
    },
    errorMessage: `Symbol must be between 3 and 10 characters`,
  },
  trim: true,
  escape: true,
  isString: true,
  matches: {
    options: SYMBOL_REGEXP,
  },
  errorMessage: 'Symbol must be a valid symbol',
};

/**
 * Validation rules for data source names.
 */
export const sourceNameValidation = {
  trim: true,
  escape: true,
  isIn: {
    options: [Object.values(SupportedDataSources)],
    errorMessage: 'Source name must be one of the supported data source types',
  },
};

/**
 * Validation rules for Ethereum addresses.
 */
export const addressValidation = {
  trim: true,
  escape: true,
  isEthereumAddress: true,
  errorMessage: 'Address must be a valid Ethereum address',
};

/**
 * Validation rules for prices.
 */
export const priceValidation = {
  isFloat: true,
  trim: true,
  escape: true,
  errorMessage: 'Price must be a valid number',
};

/**
 * Validation schema for data sources.
 */
export const dataSourceValidationSchema: Schema = {
  symbol: { ...symbolValidation, in: ['body'] },
  sourceName: { ...sourceNameValidation, in: ['body'] },
};

/**
 * Validation schema for token pairs.
 */
export const tokenPairsValidationSchema: Schema = {
  price: { ...priceValidation, in: ['body'] },
  address: { ...addressValidation, in: ['body'] },
  symbol: { ...symbolValidation, in: ['body'] },
};
