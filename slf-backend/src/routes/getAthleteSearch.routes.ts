import { Router } from 'express';
import { getAllStudents } from '../controllers/getAthleteSearch.controller';

const router = Router();

// Route pour récupérer tous les élèves
router.get('/', getAllStudents);

export default router;