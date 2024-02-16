import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from '../controllers/listing.controller.js';

const router = Router();

router.post('/create', checkAuth, createListing);
router.post('/update/:id', checkAuth, updateListing);
router.delete('/delete/:id', checkAuth, deleteListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;
