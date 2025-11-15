import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role, firstName, lastName, coachProfile } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, mot de passe et rôle sont obligatoires' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const displayName = `${firstName || ''} ${lastName || ''}`.trim() || email;

    const newUser = await User.create({
      uid: email,
      email,
      displayName,
      role,
      coachProfile: role === 'coach' ? coachProfile : undefined,
      passwordHash,
    });

    const token = jwt.sign(
      { userId: newUser._id.toString(), uid: newUser.uid, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ Nouvel utilisateur inscrit : ${newUser.email}`);
    res.status(201).json({ user: newUser, token });
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de l’inscription", error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont obligatoires' });
  }

  try {
    const user: any = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), uid: user.uid, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ Connexion réussie pour : ${user.email}`);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
};
