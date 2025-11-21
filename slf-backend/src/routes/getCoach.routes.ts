import { Router } from 'express';
import { getAllCoachs, getCoachById, updateCoachProfile } from '../controllers/getCoach.controller';

const router = Router();

router.get('/', getAllCoachs);
router.get('/:userId', getCoachById);
router.patch('/:userId', updateCoachProfile);

export default router;