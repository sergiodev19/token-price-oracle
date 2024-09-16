import { Document, Model } from 'mongoose';
import { ISupportedDataSourceSchema } from '../utils';
export declare const SUPPORTED_DATA_SOURCE_COLLECTION = "supported-data-sources";
interface ISupportedDataSourcesModel extends ISupportedDataSourceSchema, Document {
}
export declare const SupportedDataSourcesModel: Model<ISupportedDataSourcesModel>;
export {};
//# sourceMappingURL=SupportedDataSourcesModel.d.ts.map