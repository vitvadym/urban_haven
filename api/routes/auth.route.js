import { Router } from 'express';
import { signIn, signUp} from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;
