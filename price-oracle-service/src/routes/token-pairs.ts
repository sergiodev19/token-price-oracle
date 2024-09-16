import { Router } from 'express';
import { checkSchema } from 'express-validator';
import {
  createTokenPair,
  updateTokenPair,
  deleteTokenPair,
  getTokenPairs,
  getTokenPairBySymbol,
  getTokenPairById,
} from '../controllers';
import { symbolValidation, tokenPairsValidationSchema } from '../utils';
import { authorize, validationMiddleware } from '../middlewares';

/**
 * Creates a new Express Router instance for handling token pairs routes.
 * @type {Router}
 */
const router = Router();

/**
 * Handles POST requests to the '/' path for creating a new token pair.
 * @name /token-pairs
 * @middleware {authorize} Ensures that the request is authenticated before processing.
 * @middleware {checkSchema} Validates the request body against the token pairs schema.
 * @middleware {validationMiddleware} Validates the request and checks for any validation errors.
 * @handler {createTokenPair} Creates a new token pair and saves it to the database.
 */
router.post(
  '/',
  authorize,
  checkSchema({ ...tokenPairsValidationSchema, price: { optional: true } }),
  validationMiddleware,
  createTokenPair,
);

/**
 * Handles GET requests to the '/' path for retrieving all token pairs.
 * @name /token-pairs
 * @middleware {validationMiddleware} Validates the request and checks for any validation errors.
 * @handler {getTokenPairs} Retrieves all token pairs from the database.
 */
router.get('/', validationMiddleware, getTokenPairs);

/**
 * Handles GET requests to the '/by-symbol/:symbol' path for retrieving a token pair by its symbol.
 * @name /token-pairs/by-symbol/:symbol
 * @middleware {checkSchema} Validates the symbol parameter against the schema.
 * @middleware {validationMiddleware} Validates the request and checks for any validation errors.
 * @handler {getTokenPairBySymbol} Retrieves a token pair from the database by its symbol.
 */
router.get(
  '/by-symbol/:symbol',
  checkSchema({ symbol: { ...symbolValidation, in: ['params'] } }),
  validationMiddleware,
  getTokenPairBySymbol,
);

/**
 * Handles GET requests to the '/:id' path for retrieving a token pair by its ID.
 * @name /token-pairs/:id
 * @middleware {validationMiddleware} Validates the request and checks for any validation errors.
 * @handler {getTokenPairById} Retrieves a token pair from the database by its ID.
 */
router.get('/:id', validationMiddleware, getTokenPairById);

/**
 * Handles PUT requests to the '/:id' path for updating an existing token pair by its ID.
 * @name /token-pairs/:id
 * @middleware {authorize} Ensures that the request is authenticated before processing.
 * @middleware {checkSchema} Validates the request body against the token pairs schema with optional fields.
 * @middleware {validationMiddleware} Validates the request and checks for any validation errors.
 * @handler {updateTokenPair} Updates an existing token pair in the database.
 */
router.put(
  '/:id',
  authorize,
  checkSchema({
    ...tokenPairsValidationSchema,
    price: { optional: true },
    address: { optional: true },
    symbol: { optional: true },
  }),
  validationMiddleware,
  updateTokenPair,
);

/**
 * Handles DELETE requests to the '/:id' path for deleting a token pair by its ID.
 * @name /token-pairs/:id
 * @middleware {authorize} Ensures that the request is authenticated before processing.
 * @middleware {validationMiddleware} Validates the request and checks for any validation errors.
 * @handler {deleteTokenPair} Deletes a token pair from the database by its ID.
 */
router.delete('/:id', authorize, validationMiddleware, deleteTokenPair);

export default router;
