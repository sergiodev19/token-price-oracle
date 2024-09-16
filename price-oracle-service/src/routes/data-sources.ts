import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { createDataSource, updateDataSource, deleteDataSource } from '../controllers';
import { dataSourceValidationSchema } from '../utils';
import { validationMiddleware } from '../middlewares';

/**
 * Creates a new Express Router instance for handling routes related to data sources.
 * @type {Router}
 */
const router = Router();

/**
 * Route handler for creating a new data source.
 * @name POST /
 * @middleware {checkSchema} Validates the request body using express-validator with dataSourceValidationSchema.
 * @middleware {validationMiddleware} Handles validation errors.
 * @middleware {createDataSource} Controller function to handle the request and response.
 */
router.post('/', checkSchema(dataSourceValidationSchema), validationMiddleware, createDataSource);

/**
 * Route handler for updating an existing data source.
 * @name PUT /:id
 * @param {string} id - The ID of the data source to update.
 * @middleware {checkSchema} Validates the request body using express-validator with dataSourceValidationSchema,
 * allowing optional fields symbol and sourceName.
 * @middleware {validationMiddleware} Handles validation errors.
 * @middleware {updateDataSource} Controller function to handle the request and response.
 */
router.put(
  '/:id',
  checkSchema({
    ...dataSourceValidationSchema,
    symbol: { optional: true },
    sourceName: { optional: true },
  }),
  validationMiddleware,
  updateDataSource,
);

/**
 * Route handler for deleting an existing data source.
 * @name DELETE /:id
 * @param {string} id - The ID of the data source to delete.
 * @middleware {validationMiddleware} Handles validation errors.
 * @middleware {deleteDataSource} Controller function to handle the request and response.
 */
router.delete('/:id', validationMiddleware, deleteDataSource);

export default router;
