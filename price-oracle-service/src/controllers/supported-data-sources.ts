import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import { SupportedDataSourcesModel } from '../models';
import { AuthRequest } from '../utils';

/**
 * Retrieves all supported data sources.
 * @param req - The request object containing the authentication information.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the list of supported data sources.
 * @throws Error if there is an issue retrieving the supported data sources.
 */
export const getSupportedDataSources = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const supportedDataSources = await SupportedDataSourcesModel.find().exec();

    res.status(200).json(supportedDataSources);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a supported data source by its ID.
 * @param req - The request object containing the parameters.
 * @param req.params - The URL parameters, including `id` (the ID of the data source to delete).
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the ID of the deleted data source.
 * @throws Error if the data source cannot be deleted or does not exist.
 */
export const deleteSupportedDataSourceById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const id = new Types.ObjectId(req.params.id);

  try {
    await SupportedDataSourcesModel.findOneAndDelete({ _id: id }).exec();

    res.status(200).json({ deletedId: req.params.id });
  } catch (error) {
    next(error);
  }
};
