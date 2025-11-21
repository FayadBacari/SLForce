import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';


export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string, 
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (user: IUser): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

