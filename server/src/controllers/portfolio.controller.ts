import { Request, Response, NextFunction } from 'express';
import Portfolio from '../models/portfolio.model';
import ErrorResponse from '../utils/error-response';
import asyncHandler from '../utils/async-handler';

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
export const getPortfolioItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const portfolioItems = await Portfolio.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: portfolioItems.length,
    data: portfolioItems
  });
});

// @desc    Get single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
export const getPortfolioItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const portfolioItem = await Portfolio.findById(req.params.id);

  if (!portfolioItem) {
    return next(new ErrorResponse(`Portfolio item not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: portfolioItem
  });
});

// @desc    Create new portfolio item
// @route   POST /api/portfolio
// @access  Private/Admin
export const createPortfolioItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const portfolioItem = await Portfolio.create(req.body);

  res.status(201).json({
    success: true,
    data: portfolioItem
  });
});

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
export const updatePortfolioItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let portfolioItem = await Portfolio.findById(req.params.id);

  if (!portfolioItem) {
    return next(new ErrorResponse(`Portfolio item not found with id of ${req.params.id}`, 404));
  }

  portfolioItem = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: portfolioItem
  });
});

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
export const deletePortfolioItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const portfolioItem = await Portfolio.findById(req.params.id);

  if (!portfolioItem) {
    return next(new ErrorResponse(`Portfolio item not found with id of ${req.params.id}`, 404));
  }

  await portfolioItem.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
