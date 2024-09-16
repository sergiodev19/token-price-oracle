import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import { DataSourceModel, SupportedDataSourcesModel, TokenPairModel } from '../models';
import { AuthRequest, BadRequestError, NotFoundError } from '../utils';

/**
 * Creates a new data source.
 * @param req - The request object containing the body with `symbol` and `sourceName`.
 * @param req.body - The request body, including `symbol` (the symbol of the token pair) and `sourceName` (the name of the supported data source).
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the newly created data source.
 * @throws BadRequestError if the data source already exists.
 * @throws NotFoundError if the token pair or supported data source does not exist.
 */
export const createDataSource = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { symbol, sourceName } = req.body;

  try {
    const tokenPair = await TokenPairModel.findOne({ symbol }).exec();
    const source = await SupportedDataSourcesModel.findOne({ name: sourceName }).exec();

    if (!tokenPair) {
      throw new NotFoundError(`Token pair does not exists with this symbol ${symbol}`);
    }

    if (!source) {
      throw new NotFoundError(`Supported source does not exists with this name ${sourceName}`);
    }

    const dataSourceExists = await DataSourceModel.findOne({
      tokenPair: tokenPair._id,
      source: source._id,
    }).exec();

    if (dataSourceExists) {
      throw new BadRequestError(
        `Data source already exists with this symbol ${symbol} and source name ${sourceName}`,
      );
    }

    const dataSource = {
      tokenPair: tokenPair._id,
      source: source._id,
    };

    const newDataSource = await new DataSourceModel(dataSource).save();
    await TokenPairModel.updateOne(
      { symbol },
      { $set: { dataSources: [...tokenPair.dataSources, newDataSource._id] } },
    );

    res.status(201).json(newDataSource);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing data source.
 * @param req - The request object containing the parameters and body.
 * @param req.params - The URL parameters, including `id` (the ID of the data source to update).
 * @param req.body - The request body, including optional `symbol` and `sourceName` for updates.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the updated data source ID.
 * @throws NotFoundError if the data source, token pair, or supported data source does not exist.
 */
export const updateDataSource = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);
  const { symbol, sourceName } = req.body;

  try {
    const dataSource = await DataSourceModel.findById(id).exec();

    if (!dataSource) {
      throw new NotFoundError(`Data source does not exists with this id ${id}`);
    }

    const updated: {
      tokenPair?: Types.ObjectId;
      source?: Types.ObjectId;
    } = {};

    if (symbol) {
      const tokenPair = await TokenPairModel.findOne({ symbol }).exec();

      if (!tokenPair) {
        throw new NotFoundError(`Token pair does not exists with this symbol ${symbol}`);
      }

      updated.tokenPair = tokenPair._id as Types.ObjectId;
    }

    if (sourceName) {
      const source = await SupportedDataSourcesModel.findOne({ name: sourceName }).exec();

      if (!source) {
        throw new NotFoundError(`Supported source does not exists with this name ${sourceName}`);
      }

      updated.source = source._id as Types.ObjectId;
    }

    await DataSourceModel.updateOne({ _id: id }, { $set: updated }).exec();

    res.status(200).json({ updatedId: req.params.id });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes an existing data source.
 * @param req - The request object containing the parameters.
 * @param req.params - The URL parameters, including `id` (the ID of the data source to delete).
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the ID of the deleted data source.
 * @throws NotFoundError if the data source does not exist.
 */
export const deleteDataSource = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const id = new Types.ObjectId(req.params.id);

  try {
    const dataSource = await DataSourceModel.findById(id).exec();

    if (!dataSource) {
      throw new NotFoundError(`Data source does not exists with this id ${id}`);
    }

    await TokenPairModel.updateOne(
      { _id: dataSource.tokenPair },
      { $pull: { dataSources: id } },
    ).exec();
    await DataSourceModel.findOneAndDelete({ _id: id }).exec();

    res.status(200).json({ deletedId: req.params.id });
  } catch (error) {
    next(error);
  }
};
