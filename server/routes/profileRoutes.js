import express from 'express';
import { setupProfile, getProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

router.post('/setup', setupProfile);
router.get('/me', getProfile);

export default router;