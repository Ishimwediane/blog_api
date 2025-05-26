import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const protect = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Not authorized' });
  } else {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = await User.findByPk(decoded.userId);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};
export const adminOnly = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Admins only' });
  } else {
    next();
  }
};

