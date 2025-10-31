import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { uploadImage } from '../middleware/multer.js';
import * as listingController from '../controllers/listing.controller.js';

const router = Router();

router.post('/create', checkAuth, uploadImage, listingController.createListing);
router.post('/update/:id', checkAuth, listingController.updateListing);
router.delete('/delete/:id', checkAuth, listingController.deleteListing);
router.get('/get/:id', listingController.getListing);
router.get('/get', listingController.getListings);

export default router;
