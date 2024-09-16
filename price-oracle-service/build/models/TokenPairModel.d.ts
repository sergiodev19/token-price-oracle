import { Document, Model } from 'mongoose';
import { ITokenPairSchema } from '../utils';
export declare const TOKEN_PAIRS_COLLECTION = "token-pairs";
interface ITokenPairModel extends ITokenPairSchema, Document {
}
export declare const TokenPairModel: Model<ITokenPairModel>;
export {};
//# sourceMappingURL=TokenPairModel.d.ts.map