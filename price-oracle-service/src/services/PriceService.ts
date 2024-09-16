import axios from 'axios';
import { ethers } from 'ethers';
import {
  APIError,
  BinanceResponse,
  CryptoCompareResponse,
  IDataSourceTypes,
  ITokenPairSchema,
  PriceVolumePair,
  SupportedDataSources,
} from '../utils';

/**
 * A service for aggregating and calculating token prices from various data sources.
 * @class
 */
class PriceService {
  /**
   * Aggregates price data from multiple data sources for a given token pair.
   * @param {ITokenPairSchema} tokenPair - The token pair containing data sources and other details.
   * @returns {Promise<number>} - The aggregated average price of the token pair.
   * @throws {APIError} - Throws an error if no price-volume pairs are provided or if any data source operation fails.
   */
  async aggregate(tokenPair: ITokenPairSchema): Promise<number> {
    const promises = tokenPair.dataSources.map(async (dataSource) => {
      const param =
        dataSource.source.sourceType === IDataSourceTypes.CEX
          ? tokenPair.symbol
          : tokenPair.address;
      return this[dataSource.source.name](param);
    });
    const prices = await Promise.all(promises);
    return this.calculateAveragePrice(prices);
  }

  /**
   * Calculates the average price from price-volume pairs.
   * @param {PriceVolumePair[]} pairs - The array of price-volume pairs.
   * @returns {number} - The average price calculated from the provided pairs.
   * @throws {APIError} - Throws an error if the pairs array is empty or contains invalid data.
   */
  private calculateAveragePrice(pairs: PriceVolumePair[]): number {
    if (pairs.length === 0) {
      throw new APIError('No price-volume pairs provided');
    }

    let totalPriceVolume = 0;
    let totalVolume = 0;

    for (const pair of pairs) {
      if (pair.volume < 0 || pair.price < 0) {
        throw new APIError('Price and volume must be non-negative');
      }

      totalPriceVolume += pair.price * pair.volume;
      totalVolume += pair.volume;
    }

    if (totalVolume === 0) {
      throw new APIError('Total volume must be greater than zero');
    }

    return totalPriceVolume / totalVolume;
  }

  /**
   * Fetches price data from Binance.
   * @param {string} symbol - The trading pair symbol (e.g., "BTCUSDT").
   * @returns {Promise<PriceVolumePair>} - The price and volume data.
   * @throws {APIError} - Throws an error if the request to Binance fails.
   */
  private async [SupportedDataSources.BINANCE](symbol: string): Promise<PriceVolumePair> {
    try {
      const joinedSymbol = symbol.split('-').join('');
      const url = `https://api.binance.com/api/v3/ticker/price?symbol=${joinedSymbol}`;
      const { data } = await axios.get<BinanceResponse>(url);
      return {
        price: parseFloat(data.price),
        volume: 1_000_000,
      };
    } catch (error) {
      throw new APIError(
        'An error occurred during fetching price from ' +
          SupportedDataSources.BINANCE +
          (error as unknown as Error).message,
      );
    }
  }

  /**
   * Fetches price data from CryptoCompare.
   * @param {string} symbol - The trading pair symbol in the format "FROM-TO" (e.g., "BTC-USD").
   * @returns {Promise<PriceVolumePair>} - The price and volume data.
   * @throws {APIError} - Throws an error if the request to CryptoCompare fails.
   */
  private async [SupportedDataSources.CRYPTO_COMPARE](symbol: string): Promise<PriceVolumePair> {
    try {
      const [from, to] = symbol.split('-');
      const url = `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`;
      const { data } = await axios.get<CryptoCompareResponse>(url);
      return {
        price: parseFloat(data[to]),
        volume: 1_000_000,
      };
    } catch (error) {
      throw new APIError(
        'An error occurred during fetching price from ' +
          SupportedDataSources.CRYPTO_COMPARE +
          (error as unknown as Error).message,
      );
    }
  }

  /**
   * Fetches price data from Uniswap.
   * @param {string} address - The contract address of the Uniswap pair.
   * @returns {Promise<PriceVolumePair>} - The price and volume data.
   * @throws {APIError} - Throws an error if the request to Uniswap fails.
   */
  private async [SupportedDataSources.UNISWAP](address: string): Promise<PriceVolumePair> {
    try {
      const UNISWAP_PAIR_ABI = [
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
      ];
      const url = 'https://mainnet.infura.io/v3/1b9';
      const provider = new ethers.JsonRpcProvider(url);
      const uniswapPairContract = new ethers.Contract(address, UNISWAP_PAIR_ABI, provider);

      const reserves = await uniswapPairContract.getReserves();
      return {
        price: reserves.reserve1 / reserves.reserve0,
        volume: 1_000_000,
      };
    } catch (error) {
      throw new APIError(
        'An error occurred during fetching price from ' +
          SupportedDataSources.UNISWAP +
          (error as unknown as Error).message,
      );
    }
  }
}

export const priceService = new PriceService();
