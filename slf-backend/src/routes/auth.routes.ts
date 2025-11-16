import { Router } from 'express';
import { register, login, checkCoachName } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/coach-name', checkCoachName);

export default router;
