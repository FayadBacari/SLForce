import { Router } from 'express';
import User from '../models/user.model';

const router = Router();

// GET /api/coaches
// Renvoie simplement tous les utilisateurs avec role = 'coach'
router.get('/', async (req, res) => {
  try {
    const coaches = await User.find({ role: 'coach' }).select('-__v');
    res.status(200).json({ coaches });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des coachs:', error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des coachs', error: error.message });
  }
});

export default router;
