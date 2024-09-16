import { Request } from 'express';

/**
 * Represents a user schema for the application.
 */
export interface IUserSchema {
  /** The name of the user. */
  name: string;
  /** The email address of the user. */
  email: string;
  /** The hashed password of the user. */
  password: string;
  /** The date when the user was created. */
  createdAt?: Date;
  /** The date when the user was last updated. */
  updatedAt?: Date | null;
}

/**
 * Extends the Express Request object to include user information.
 */
export interface AuthRequest extends Request {
  /** The user object associated with the request, if authenticated. */
  user?: Partial<IUserSchema>;
}

/**
 * Enum representing the types of data sources.
 */
export enum IDataSourceTypes {
  /** Centralized Exchange */
  CEX = 'CEX',
  /** Decentralized Exchange */
  DEX = 'DEX',
}

/**
 * Enum representing supported data sources.
 */
export enum SupportedDataSources {
  /** Binance data source */
  BINANCE = 'BINANCE',
  /** CryptoCompare data source */
  CRYPTO_COMPARE = 'CRYPTO_COMPARE',
  /** Uniswap data source */
  UNISWAP = 'UNISWAP',
}

/**
 * Represents the schema for supported data sources.
 */
export interface ISupportedDataSourceSchema {
  /** The name of the supported data source. */
  name: SupportedDataSources;
  /** The type of the supported data source. */
  sourceType: IDataSourceTypes;
  /** The date when the schema was created. */
  createdAt?: Date;
  /** The date when the schema was last updated. */
  updatedAt?: Date | null;
}

/**
 * Represents the schema for data sources in relation to token pairs.
 */
export interface IDataSourceSchema {
  /** The token pair associated with the data source. */
  tokenPair: ITokenPairSchema;
  /** The supported data source information. */
  source: ISupportedDataSourceSchema;
  /** The date when the schema was created. */
  createdAt?: Date;
  /** The date when the schema was last updated. */
  updatedAt?: Date | null;
}

/**
 * Represents the schema for token pairs.
 */
export interface ITokenPairSchema {
  /** The symbol representing the token pair. */
  symbol: string;
  /** The address of the token pair. */
  address: string;
  /** The price of the token pair. */
  price: number;
  /** The data sources providing information about the token pair. */
  dataSources: IDataSourceSchema[];
  /** The date when the schema was created. */
  createdAt?: Date;
  /** The date when the schema was last updated. */
  updatedAt?: Date | null;
}

/**
 * Response format for Binance API.
 */
export interface BinanceResponse {
  /** The symbol of the token pair. */
  symbol: string;
  /** The price of the token pair as a string. */
  price: string;
}

/**
 * Response format for CryptoCompare API.
 */
export interface CryptoCompareResponse {
  /** The price of the token pair as a string. */
  [key: string]: string;
}

/**
 * Represents a price-volume pair.
 */
export interface PriceVolumePair {
  /** The price of the token pair. */
  price: number;
  /** The volume of the token pair. */
  volume: number;
}
