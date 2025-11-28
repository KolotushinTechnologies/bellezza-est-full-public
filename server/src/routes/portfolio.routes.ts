import express from 'express';
import {
  getPortfolioItems,
  getPortfolioItem,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '../controllers/portfolio.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getPortfolioItems);
router.get('/:id', getPortfolioItem);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), createPortfolioItem);
router.put('/:id', protect, authorize('admin'), updatePortfolioItem);
router.delete('/:id', protect, authorize('admin'), deletePortfolioItem);

export default router;
