import { Document, Model } from 'mongoose';
import { IUserSchema } from '../utils';
interface IUserModel extends IUserSchema, Document {
}
export declare const UserModel: Model<IUserModel>;
export {};
//# sourceMappingURL=Users.d.ts.map