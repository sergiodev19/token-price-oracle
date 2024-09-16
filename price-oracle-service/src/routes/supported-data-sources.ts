import { Router } from 'express';
import { getSupportedDataSources, deleteSupportedDataSourceById } from '../controllers';
import { authorize, validationMiddleware } from '../middlewares';

/**
 * Creates a new Express Router instance for handling supported data sources routes.
 * @type {Router}
 */
const router = Router();

/**
 * Handles GET requests to the '/' path for retrieving all supported data sources.
 * @name /supported-data-sources
 * @middleware {validationMiddleware} Validates the request before processing.
 * @handler {getSupportedDataSources} Retrieves all supported data sources from the database.
 */
router.get('/', validationMiddleware, getSupportedDataSources);

/**
 * Handles DELETE requests to the '/:id' path for deleting a supported data source by its ID.
 * @name /supported-data-sources/:id
 * @middleware {authorize} Ensures that the request is authenticated before processing.
 * @middleware {validationMiddleware} Validates the request before processing.
 * @handler {deleteSupportedDataSourceById} Deletes a supported data source from the database by its ID.
 */
router.delete('/:id', authorize, validationMiddleware, deleteSupportedDataSourceById);

export default router;
