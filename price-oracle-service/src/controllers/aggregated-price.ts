import { NextFunction, Request, Response } from 'express';
import { TokenPairModel } from '../models';
import { NotFoundError } from '../utils';
import { cacheService, priceService } from '../services';

/**
 * Retrieves the aggregated price for a given symbol.
 * @param req - The request object containing the parameters and query.
 * @param req.params - The URL parameters, including the `symbol` parameter.
 * @param res - The response object used to send the response.
 * @param next - The next middleware function to call in case of an error.
 * @returns A JSON response with the aggregated price or an error message.
 */
export const getAggregatedPrice = async (req: Request, res: Response, next: NextFunction) => {
  const { symbol } = req.params;

  try {
    // Check if the data is available in the cache
    const dataFromCache = await cacheService.get(symbol);

    if (dataFromCache) {
      return res.status(200).json(JSON.parse(dataFromCache));
    }

    // Retrieve token pair from the database
    const tokenPair = await TokenPairModel.findOne({ symbol }).populate('dataSources');

    if (!tokenPair) {
      throw new NotFoundError('Token pair not found');
    }

    // Aggregate the price using the price service
    const aggregatedPrice = await priceService.aggregate(tokenPair);
    
    // Cache the aggregated price
    await cacheService.set(symbol, JSON.stringify(aggregatedPrice));

    // Return the aggregated price
    return res.status(200).json(aggregatedPrice);
  } catch (error) {
    // Pass any errors to the next middleware
    return next(error);
  }
};
