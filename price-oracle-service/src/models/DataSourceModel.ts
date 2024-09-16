import { Schema, Document, Model, model } from 'mongoose';
import { IDataSourceSchema } from '../utils';
import { TOKEN_PAIRS_COLLECTION } from './TokenPairModel';
import { SUPPORTED_DATA_SOURCE_COLLECTION } from './SupportedDataSourcesModel';

/**
 * The collection name for the data sources in MongoDB.
 * @constant {string}
 */
export const DATA_SOURCE_COLLECTION = 'data-sources';

/**
 * Schema definition for a data source in the database.
 * @type {Schema<IDataSourceSchema>}
 */
const DataSourceSchema: Schema = new Schema<IDataSourceSchema>(
  {
    /**
     * Reference to the token pair associated with this data source.
     * @type {Schema.Types.ObjectId}
     * @ref {TOKEN_PAIRS_COLLECTION}
     */
    tokenPair: {
      type: Schema.Types.ObjectId,
      ref: TOKEN_PAIRS_COLLECTION,
    },

    /**
     * Reference to the supported data source associated with this data source.
     * @type {Schema.Types.ObjectId}
     * @ref {SUPPORTED_DATA_SOURCE_COLLECTION}
     */
    source: {
      type: Schema.Types.ObjectId,
      ref: SUPPORTED_DATA_SOURCE_COLLECTION,
    },
  },
  { timestamps: true },
);

/**
 * Interface for the DataSource model which extends Mongoose's Document.
 * @interface IDataSourceModel
 * @extends IDataSourceSchema
 * @extends Document
 */
interface IDataSourceModel extends IDataSourceSchema, Document {}

/**
 * Mongoose model for the DataSource collection.
 * @type {Model<IDataSourceModel>}
 */
export const DataSourceModel: Model<IDataSourceModel> = model<IDataSourceModel>(
  DATA_SOURCE_COLLECTION,
  DataSourceSchema,
);
