import User from '../models/user';
import { Request, Response } from 'express';

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find({ role: 'eleve' }).select('-password');
    res.status(200).json({ students });
  } catch (error) {
    console.error('❌ Erreur récupération élèves :', error);
    res.status(500).json({ message: "Impossible de récupérer les élèves" });
  }
};