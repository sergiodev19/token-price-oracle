import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../utils';
export declare const createTokenPair: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateTokenPair: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getTokenPairById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getTokenPairBySymbol: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getTokenPairs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteTokenPair: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=token-pairs.d.ts.map