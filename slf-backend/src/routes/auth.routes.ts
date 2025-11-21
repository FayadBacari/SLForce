import { Router } from 'express';
import { register, login, checkCoachName, getProfile } from '../controllers/auth.controller';
import { authRequired } from '../middlewares/auth.middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/coach-name', checkCoachName);
router.get('/profile', authRequired, getProfile);

export default router;
