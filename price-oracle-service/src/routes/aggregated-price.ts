import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { getAggregatedPrice } from '../controllers';
import { symbolValidation } from '../utils';

/**
 * Creates a new Express Router instance for handling routes related to aggregated price.
 * @type {Router}
 */
const router = Router();

/**
 * Route handler for retrieving the aggregated price of a token.
 * @name GET /:symbol
 * @param {string} symbol - The symbol of the token to retrieve the aggregated price for.
 * @middleware {checkSchema} Validates the symbol parameter using express-validator.
 * @middleware {getAggregatedPrice} Controller function to handle the request and response.
 */
router.get(
  '/:symbol',
  checkSchema({ symbol: { ...symbolValidation, in: ['params'] } }),
  getAggregatedPrice,
);

export default router;
