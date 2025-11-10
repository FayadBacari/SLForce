import { Request, Response } from 'express';
import User from '../models/user.model';

export const registerUser = async (req: Request, res: Response) => {
  const firebaseUser = (req as any).user;
  const { role, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ uid: firebaseUser.uid });
    if (existingUser) return res.status(200).json({ user: existingUser });

    const newUser = await User.create({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: `${firstName} ${lastName}`,
      role,
    });

    res.status(201).json({ user: newUser });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de l’inscription', error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const firebaseUser = (req as any).user;

  try {
    const user = await User.findOne({ uid: firebaseUser.uid });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
};