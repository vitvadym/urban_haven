import { Router } from 'express';
import { deleteUser, updateUser } from '../controllers/user.controller.js';
import checkAuth from '../utils/checkAuth.js';
import { getUserListings } from '../controllers/listing.controller.js';
const router = Router();

router.post('/update/:id', checkAuth, updateUser);
router.delete('/delete/:id', checkAuth, deleteUser);
router.get('/listing/:id', checkAuth, getUserListings);

export default router;
