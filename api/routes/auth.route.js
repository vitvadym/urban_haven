import { Router } from 'express';
import {
  googleSignIn,
  signIn,
  signUp,
  signOut,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google-signin', googleSignIn);
router.get('/signout', signOut);

export default router;
