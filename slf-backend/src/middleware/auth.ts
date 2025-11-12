import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

export async function verifyFirebaseToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token || req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide', error });
  }
}