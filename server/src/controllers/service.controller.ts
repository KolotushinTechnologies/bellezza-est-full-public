import { Request, Response, NextFunction } from 'express';
import Service from '../models/service.model';
import ErrorResponse from '../utils/error-response';
import asyncHandler from '../utils/async-handler';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
export const createService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    data: service
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
  }

  await service.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
