import { Router } from 'express';
import { getAllStudents } from '../controllers/getAthleteSearch.controller';

const router = Router();

router.get('/', getAllStudents);

export default router;