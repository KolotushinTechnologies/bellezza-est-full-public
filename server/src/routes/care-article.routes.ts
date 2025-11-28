import express from 'express';
import {
  getCareArticles,
  getCareArticle,
  createCareArticle,
  updateCareArticle,
  deleteCareArticle,
} from '../controllers/care-article.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getCareArticles);
router.get('/:id', getCareArticle);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), createCareArticle);
router.put('/:id', protect, authorize('admin'), updateCareArticle);
router.delete('/:id', protect, authorize('admin'), deleteCareArticle);

export default router;
