import { Schema, Document, Model, model } from 'mongoose';
import { IUserSchema } from '../utils';

const USERS_COLLECTION = 'users';

// Define the schema for the User collection
const UserSchema: Schema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Interface for the User model that includes both IUserSchema and Mongoose Document
interface IUsersModel extends IUserSchema, Document {}

// Create and export the User model using the schema
export const UsersModel: Model<IUsersModel> = model<IUsersModel>(USERS_COLLECTION, UserSchema);
