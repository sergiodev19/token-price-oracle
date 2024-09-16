import { Router } from 'express';
import SupportedDataSourcesRouter from './supported-data-sources';
import DataSourcesRouter from './data-sources';
import TokenPairsRouter from './token-pairs';
import AggregatedPriceRouter from './aggregated-price';
import { authorize } from '../middlewares';

/**
 * Creates a new Express Router instance for handling API routes.
 * @type {Router}
 */
const router = Router();

/**
 * Mounts the Supported Data Sources router at the '/supported-data-sources' path.
 * @name /supported-data-sources
 * @see SupportedDataSourcesRouter
 */
router.use('/supported-data-sources', SupportedDataSourcesRouter);

/**
 * Mounts the Data Sources router at the '/data-sources' path.
 * @name /data-sources
 * @middleware {authorize} Ensures that the request is authenticated before processing.
 * @see DataSourcesRouter
 */
router.use('/data-sources', authorize, DataSourcesRouter);

/**
 * Mounts the Token Pairs router at the '/token-pairs' path.
 * @name /token-pairs
 * @see TokenPairsRouter
 */
router.use('/token-pairs', TokenPairsRouter);

/**
 * Mounts the Aggregated Price router at the '/aggregated-price' path.
 * @name /aggregated-price
 * @see AggregatedPriceRouter
 */
router.use('/aggregated-price', AggregatedPriceRouter);

export { router };
