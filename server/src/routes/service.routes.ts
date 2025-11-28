import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getService);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), createService);
router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

export default router;
