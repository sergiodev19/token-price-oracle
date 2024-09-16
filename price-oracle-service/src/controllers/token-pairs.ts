import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { DataSourceModel, TokenPairModel } from '../models';
import { AuthRequest, BadRequestError, ITokenPairSchema, NotFoundError } from '../utils';

/**
 * Creates a new token pair.
 * @param req - The request object containing the authentication information and the data for the new token pair.
 * @param req.body - The body of the request, including `price`, `symbol`, and `address` for the token pair.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the created token pair.
 * @throws BadRequestError if a token pair with the same symbol or address already exists.
 */
export const createTokenPair = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { price, symbol, address } = req.body;

  try {
    const tokenPairExists = await TokenPairModel.findOne({
      $or: [{ symbol }, { address }],
    }).exec();

    if (tokenPairExists) {
      throw new BadRequestError(
        `Token pair already exists with this symbol ${symbol} or this address ${address}`,
      );
    }

    const tokenPair = {
      symbol,
      price: price || 0,
      address,
    } as ITokenPairSchema;

    const result = new TokenPairModel(tokenPair).save();

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing token pair by its ID.
 * @param req - The request object containing the authentication information and the updated data for the token pair.
 * @param req.params - The URL parameters, including `id` (the ID of the token pair to update).
 * @param req.body - The body of the request, including `price`, `symbol`, and `address` to update.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the ID of the updated token pair.
 * @throws NotFoundError if the token pair does not exist.
 */
export const updateTokenPair = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);
  const { price, symbol, address } = req.body;

  try {
    const tokenPair = await TokenPairModel.findById(id).exec();

    if (!tokenPair) {
      throw new NotFoundError(`Token pair does not exists with this id ${id}`);
    }

    const tokenPairUpdated = {
      symbol: symbol || tokenPair.symbol,
      price: price || tokenPair.price,
      address: address || tokenPair.address,
    } as ITokenPairSchema;

    await TokenPairModel.updateOne({ _id: id }, { $set: tokenPairUpdated }).exec();

    res.status(200).json({ updatedId: req.params.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a token pair by its ID.
 * @param req - The request object containing the URL parameters.
 * @param req.params - The URL parameters, including `id` (the ID of the token pair to retrieve).
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the token pair.
 * @throws NotFoundError if the token pair does not exist.
 */
export const getTokenPairById = async (req: Request, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  try {
    const tokenPair = await TokenPairModel.findById(id).exec();

    if (!tokenPair) {
      throw new NotFoundError(`Token pair does not exists with this id ${id}`);
    }

    res.status(200).json(tokenPair);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a token pair by its symbol.
 * @param req - The request object containing the URL parameters.
 * @param req.params - The URL parameters, including `symbol` (the symbol of the token pair to retrieve).
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the token pair.
 * @throws NotFoundError if the token pair does not exist.
 */
export const getTokenPairBySymbol = async (req: Request, res: Response, next: NextFunction) => {
  const { symbol } = req.params;

  try {
    const tokenPair = await TokenPairModel.findOne({ symbol }).exec();

    if (!tokenPair) {
      throw new NotFoundError(`Token pair does not exists with this symbol ${symbol}`);
    }

    res.status(200).json(tokenPair);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves all token pairs.
 * @param req - The request object containing the authentication information.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with a list of all token pairs.
 * @throws Error if there is an issue retrieving the token pairs.
 */
export const getTokenPairs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenPairs = await TokenPairModel.find().exec();

    res.status(200).json(tokenPairs);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a token pair by its ID.
 * @param req - The request object containing the authentication information and the URL parameters.
 * @param req.params - The URL parameters, including `id` (the ID of the token pair to delete).
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the ID of the deleted token pair.
 * @throws Error if there is an issue deleting the token pair or associated data sources.
 */
export const deleteTokenPair = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  try {
    await TokenPairModel.findOneAndDelete({ _id: id }).exec();
    await DataSourceModel.deleteMany({ tokenPair: id }).exec();

    res.status(200).json({ deletedId: req.params.id });
  } catch (error) {
    next(error);
  }
};
