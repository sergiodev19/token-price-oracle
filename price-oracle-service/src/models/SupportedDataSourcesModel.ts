import { Schema, Document, Model, model } from 'mongoose';
import { IDataSourceTypes, ISupportedDataSourceSchema, SupportedDataSources } from '../utils';

/**
 * The collection name for supported data sources in MongoDB.
 * @constant {string}
 */
export const SUPPORTED_DATA_SOURCE_COLLECTION = 'supported-data-sources';

/**
 * Schema definition for supported data sources in the database.
 * @type {Schema<ISupportedDataSourceSchema>}
 */
const SupportedDataSourcesSchema: Schema = new Schema<ISupportedDataSourceSchema>(
  {
    /**
     * The name of the supported data source.
     * Must be one of the predefined values in the SupportedDataSources enum.
     * @type {string}
     * @enum {SupportedDataSources}
     */
    name: {
      type: String,
      required: true,
      enum: {
        values: Object.values(SupportedDataSources),
        message: '{VALUE} is not a valid type',
      },
    },

    /**
     * The type of the data source.
     * Must be one of the predefined values in the IDataSourceTypes enum.
     * @type {string}
     * @enum {IDataSourceTypes}
     */
    sourceType: {
      type: String,
      required: true,
      enum: {
        values: Object.values(IDataSourceTypes),
        message: '{VALUE} is not a valid type',
      },
    },
  },
  { timestamps: true },
);

/**
 * Interface for the SupportedDataSources model which extends Mongoose's Document.
 * @interface ISupportedDataSourcesModel
 * @extends ISupportedDataSourceSchema
 * @extends Document
 */
interface ISupportedDataSourcesModel extends ISupportedDataSourceSchema, Document {}

/**
 * Mongoose model for the SupportedDataSources collection.
 * @type {Model<ISupportedDataSourcesModel>}
 */
export const SupportedDataSourcesModel: Model<ISupportedDataSourcesModel> =
  model<ISupportedDataSourcesModel>(SUPPORTED_DATA_SOURCE_COLLECTION, SupportedDataSourcesSchema);
