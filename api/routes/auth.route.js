import { Router } from 'express';
import { singUp } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', singUp);

export default router;
