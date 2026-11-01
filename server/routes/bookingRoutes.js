import express from 'express';
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  getStats
} from '../controllers/bookingController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.patch('/:id/status', protect, requireAdmin, updateBookingStatus);
router.get('/analytics/stats', protect, requireAdmin, getStats);

export default router;
