import mongoose from 'mongoose';
import { InternalError } from '../../utils';

export class Mongoose {
  private static instance: Mongoose;
  private mongoURI: string;
  private isConnected: boolean = false;

  /**
   * Private constructor to enforce singleton pattern.
   * @param mongoURI - The URI for connecting to MongoDB.
   */
  private constructor(mongoURI: string) {
    this.mongoURI = mongoURI;
  }

  /**
   * Gets the singleton instance of the Mongoose class.
   * @returns The singleton instance of the Mongoose class.
   * @throws InternalError if the environment variable "MONGO_URI" is not set.
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
   * Connects to MongoDB if not already connected.
   * @returns A promise that resolves when the connection is established.
   * @throws Error if there is an issue connecting to MongoDB.
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
   * Disconnects from MongoDB.
   * @returns A promise that resolves when the disconnection is complete.
   * @throws Error if there is an issue disconnecting from MongoDB.
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
