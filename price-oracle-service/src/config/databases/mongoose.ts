import mongoose from 'mongoose';
import { InternalError } from '../../utils';

export class Mongoose {
  private static instance: Mongoose;
  private mongoURI: string;
  private isConnected: boolean = false;

  /**
   * Creates an instance of the Mongoose class.
   * @param mongoURI - The connection URI for the MongoDB database.
   */
  private constructor(mongoURI: string) {
    this.mongoURI = mongoURI;
  }

  /**
   * Retrieves the singleton instance of the Mongoose class.
   * @returns The singleton instance of the Mongoose class.
   * @throws InternalError if the "MONGO_URI" environment variable is not set.
   */
  public static getInstance(): Mongoose {
    if (!process.env.MONGO_URI)
      throw new InternalError('Invalid/Missing environment variable "MONGO_URI"');

    if (!Mongoose.instance) {
      Mongoose.instance = new Mongoose(process.env.MONGO_URI);
    }
    return Mongoose.instance;
  }

  /**
   * Connects to the MongoDB database.
   * @returns A promise that resolves when the connection is successful.
   * @throws Error if there is an issue connecting to the database.
   */
  public async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await mongoose.connect(this.mongoURI);
        this.isConnected = true;
        console.log('MongoDB connected successfully');
      } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
      }
    }
  }

  /**
   * Disconnects from the MongoDB database.
   * @returns A promise that resolves when the disconnection is successful.
   * @throws Error if there is an issue disconnecting from the database.
   */
  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('MongoDB disconnected');
    } catch (error) {
      console.error('MongoDB disconnection error:', error);
      throw error;
    }
  }
}
