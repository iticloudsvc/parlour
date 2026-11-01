import express from 'express';
import {
  getReviews,
  createReview,
  getBlogs,
  getTeam,
  submitContactInquiry
} from '../controllers/reviewController.js';

const router = express.Router();

router.get('/reviews', getReviews);
router.post('/reviews', createReview);
router.get('/blogs', getBlogs);
router.get('/team', getTeam);
router.post('/contact', submitContactInquiry);

export default router;
