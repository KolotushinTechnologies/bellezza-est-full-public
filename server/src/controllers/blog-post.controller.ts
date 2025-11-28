import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/blog-post.model';
import ErrorResponse from '../utils/error-response';
import asyncHandler from '../utils/async-handler';

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
export const getBlogPosts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const posts = await BlogPost.find();

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts
  });
});

// @desc    Get single blog post by ID
// @route   GET /api/blog/:id
// @access  Public
export const getBlogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`Blog post not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Get single blog post by slug
// @route   GET /api/blog/slug/:slug
// @access  Public
export const getBlogPostBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const post = await BlogPost.findOne({ slug: req.params.slug });

  if (!post) {
    return next(new ErrorResponse(`Blog post not found with slug of ${req.params.slug}`, 404));
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private/Admin
export const createBlogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const post = await BlogPost.create(req.body);

  res.status(201).json({
    success: true,
    data: post
  });
});

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updateBlogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let post = await BlogPost.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`Blog post not found with id of ${req.params.id}`, 404));
  }

  post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deleteBlogPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse(`Blog post not found with id of ${req.params.id}`, 404));
  }

  await post.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
