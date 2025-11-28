import express from 'express';
import {
  getBlogPosts,
  getBlogPost,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blog-post.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getBlogPosts);
router.get('/slug/:slug', getBlogPostBySlug);
router.get('/:id', getBlogPost);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), createBlogPost);
router.put('/:id', protect, authorize('admin'), updateBlogPost);
router.delete('/:id', protect, authorize('admin'), deleteBlogPost);

export default router;
