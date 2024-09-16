import { SupportedDataSourcesModel } from '../models';
import { InternalError } from './errors';
import { IDataSourceTypes, SupportedDataSources } from './types';

/**
 * Checks if a data source with the given name exists in the database. If it does not exist,
 * it inserts a new data source with the specified name and source type.
 * @param {SupportedDataSources} name - The name of the data source to check and insert.
 * @param {IDataSourceTypes} sourceType - The type of the data source.
 * @throws {InternalError} Throws an error if there is a problem during the check or insertion process.
 */
const checkAndInsert = async (name: SupportedDataSources, sourceType: IDataSourceTypes) => {
  try {
    const source = await SupportedDataSourcesModel.findOne({ name }).exec();

    if (!source) {
      await new SupportedDataSourcesModel({ name, sourceType }).save();
    }
  } catch (error) {
    throw new InternalError(
      'An error occurred during checking and insertion of seed: ' +
        (error as unknown as Error).message,
    );
  }
};

/**
 * Inserts supported data sources into the database if they do not already exist.
 * This function iterates over all supported data sources and inserts them with the appropriate source type.
 * @throws {InternalError} Throws an error if there is a problem during the insertion process.
 */
export const insertSupportedDataSources = async () => {
  try {
    await Promise.all(
      Object.values(SupportedDataSources).map(async (dataSource) => {
        switch (dataSource) {
          case SupportedDataSources.BINANCE:
            await checkAndInsert(SupportedDataSources.BINANCE, IDataSourceTypes.CEX);
            break;
          case SupportedDataSources.CRYPTO_COMPARE:
            await checkAndInsert(SupportedDataSources.CRYPTO_COMPARE, IDataSourceTypes.CEX);
            break;
          case SupportedDataSources.UNISWAP:
            await checkAndInsert(SupportedDataSources.UNISWAP, IDataSourceTypes.DEX);
            break;
          default:
            break;
        }
      }),
    );
  } catch (error) {
    throw new InternalError(
      'An error occurred during insertion of seed: ' + (error as unknown as Error).message,
    );
  }
};
