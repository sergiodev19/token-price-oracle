import { Request } from 'express';

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface AuthRequest extends Request {
  user?: Partial<IUserSchema>;
}
