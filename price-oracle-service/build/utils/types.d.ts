import { Request } from 'express';
export interface IUserSchema {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date | null;
}
export interface AuthRequest extends Request {
    user?: Partial<IUserSchema>;
}
export declare enum IDataSourceTypes {
    CEX = "CEX",
    DEX = "DEX"
}
export declare enum SupportedDataSources {
    BINANCE = "BINANCE",
    CRYPTO_COMPARE = "CRYPTO_COMPARE",
    UNISWAP = "UNISWAP"
}
export interface ISupportedDataSourceSchema {
    name: SupportedDataSources;
    sourceType: IDataSourceTypes;
    createdAt?: Date;
    updatedAt?: Date | null;
}
export interface IDataSourceSchema {
    tokenPair: ITokenPairSchema;
    source: ISupportedDataSourceSchema;
    createdAt?: Date;
    updatedAt?: Date | null;
}
export interface ITokenPairSchema {
    symbol: string;
    address: string;
    price: number;
    dataSources: IDataSourceSchema[];
    createdAt?: Date;
    updatedAt?: Date | null;
}
//# sourceMappingURL=types.d.ts.map