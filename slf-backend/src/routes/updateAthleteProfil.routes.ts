import { Router } from 'express';
import { updateAthleteProfile, getAthleteProfile } from '../controllers/updateAthleteProfil.controller';

const router = Router();

router.get('/:id/athlete', getAthleteProfile);
router.patch('/:id/athlete', updateAthleteProfile);

export default router;