import express from 'express';
import {
  getContact,
  updateContact,
} from '../controllers/contact.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Public route - anyone can view contact info
router.get('/', getContact);

// Protected route - only admin can update contact info
router.put('/', protect, authorize('admin'), updateContact);

export default router;
