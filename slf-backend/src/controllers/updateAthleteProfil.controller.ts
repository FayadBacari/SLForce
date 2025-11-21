import User from '../models/user';
import { Request, Response } from 'express';



export const updateAthleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { athleteProfile: data },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    return res.json({ message: "Profil athlète mis à jour", user });
  } catch (error: any) {
    console.error('❌ Erreur update athlete:', error);
    return res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};

export const getAthleteProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    return res.json({ athleteProfile: user.athleteProfile || null });
  } catch (error: any) {
    console.error('❌ Erreur get athlete:', error);
    return res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};