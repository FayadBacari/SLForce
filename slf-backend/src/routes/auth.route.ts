import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { verifyFirebaseToken } from '../middleware/auth';

const router = Router();

// POST /api/auth/register
router.post('/register', verifyFirebaseToken, registerUser);

// POST /api/auth/login
router.post('/login', verifyFirebaseToken, loginUser);

export default router;