import { Request, Response } from 'express';
import { hashPassword, comparePassword, generateToken } from '../services/auth.services';

import User from '../models/user';

export const register = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      coachProfile,
    } = req.body;

    // Vérifie si l’email existe
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Si coach, vérifier que le pseudo n'est pas déjà pris
    if (role === 'coach' && coachProfile?.name) {
      const pseudoExists = await User.findOne({ 'coachProfile.name': coachProfile.name });
      if (pseudoExists) {
        return res.status(400).json({ message: 'Ce pseudo de coach est déjà utilisé' });
      }
    }

    // Hash du mot de passe
    const hashed = await hashPassword(password);

    // Création du user
    const user = await User.create({
      email,
      password: hashed,
      role,
      firstName,
      lastName,
      coachProfile: role === 'coach' ? coachProfile : undefined,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: 'Inscription réussie',
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Recherche user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifie mot de passe
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: 'Connexion réussie',
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Vérifie si un nom de coach est déjà pris
export const checkCoachName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Nom de coach manquant' });
    }

    const existing = await User.findOne({ 'coachProfile.name': name });

    return res.status(200).json({ available: !existing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupère le profil de l'utilisateur connecté
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
