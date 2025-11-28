import { Request, Response, NextFunction } from 'express';
import CareArticle from '../models/care-article.model';
import ErrorResponse from '../utils/error-response';
import asyncHandler from '../utils/async-handler';

// @desc    Get all care articles
// @route   GET /api/care
// @access  Public
export const getCareArticles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const articles = await CareArticle.find();

  res.status(200).json({
    success: true,
    count: articles.length,
    data: articles
  });
});

// @desc    Get single care article
// @route   GET /api/care/:id
// @access  Public
export const getCareArticle = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const article = await CareArticle.findById(req.params.id);

  if (!article) {
    return next(new ErrorResponse(`Care article not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: article
  });
});

// @desc    Create new care article
// @route   POST /api/care
// @access  Private/Admin
export const createCareArticle = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const article = await CareArticle.create(req.body);

  res.status(201).json({
    success: true,
    data: article
  });
});

// @desc    Update care article
// @route   PUT /api/care/:id
// @access  Private/Admin
export const updateCareArticle = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let article = await CareArticle.findById(req.params.id);

  if (!article) {
    return next(new ErrorResponse(`Care article not found with id of ${req.params.id}`, 404));
  }

  article = await CareArticle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: article
  });
});

// @desc    Delete care article
// @route   DELETE /api/care/:id
// @access  Private/Admin
export const deleteCareArticle = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const article = await CareArticle.findById(req.params.id);

  if (!article) {
    return next(new ErrorResponse(`Care article not found with id of ${req.params.id}`, 404));
  }

  await article.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
