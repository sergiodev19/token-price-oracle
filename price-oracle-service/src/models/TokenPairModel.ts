import { Schema, Document, Model, model } from 'mongoose';
import { ITokenPairSchema } from '../utils';
import { DATA_SOURCE_COLLECTION } from './DataSourceModel';

/** 
 * The collection name for token pairs in MongoDB.
 * @constant {string}
 */
export const TOKEN_PAIRS_COLLECTION = 'token-pairs';

/**
 * Schema definition for token pairs in the database.
 * @type {Schema<ITokenPairSchema>}
 */
const TokenPairSchema: Schema = new Schema<ITokenPairSchema>(
  {
    /**
     * The symbol associated with the token pair.
     * Must be unique within the collection.
     * @type {string}
     */
    symbol: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * The address associated with the token pair.
     * @type {string}
     */
    address: {
      type: String,
      required: true,
    },

    /**
     * The price of the token pair.
     * Defaults to 0 if not provided.
     * @type {number}
     */
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    /**
     * Array of data source references related to the token pair.
     * Each entry is an ObjectId referring to documents in the DataSource collection.
     * @type {Array<Schema.Types.ObjectId>}
     */
    dataSources: [
      {
        type: Schema.Types.ObjectId,
        ref: DATA_SOURCE_COLLECTION,
        required: false,
      },
    ],
  },
  { timestamps: true },
);

/**
 * Interface for the TokenPair model which extends Mongoose's Document.
 * @interface ITokenPairModel
 * @extends ITokenPairSchema
 * @extends Document
 */
interface ITokenPairModel extends ITokenPairSchema, Document {}

/**
 * Mongoose model for the TokenPairs collection.
 * @type {Model<ITokenPairModel>}
 */
export const TokenPairModel: Model<ITokenPairModel> = model<ITokenPairModel>(
  TOKEN_PAIRS_COLLECTION,
  TokenPairSchema,
);
