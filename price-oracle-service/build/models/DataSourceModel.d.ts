import { Document, Model } from 'mongoose';
import { IDataSourceSchema } from '../utils';
export declare const DATA_SOURCE_COLLECTION = "data-sources";
interface IDataSourceModel extends IDataSourceSchema, Document {
}
export declare const DataSourceModel: Model<IDataSourceModel>;
export {};
//# sourceMappingURL=DataSourceModel.d.ts.map