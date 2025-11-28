import { Request, Response, NextFunction } from 'express';
import Client from '../models/client.model';
import ErrorResponse from '../utils/error-response';
import asyncHandler from '../utils/async-handler';

// @desc    Get all clients with filtering, sorting, pagination
// @route   GET /api/clients
// @access  Private/Admin
export const getClients = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = Client.find(JSON.parse(queryStr));

  // Handle text search
  if (req.query.search) {
    const searchQuery = { $text: { $search: req.query.search as string } };
    query = Client.find(searchQuery);
  }

  // Select Fields
  if (req.query.select) {
    const fields = (req.query.select as string).split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Client.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const clients = await query;

  // Pagination result
  const pagination: any = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: clients.length,
    pagination,
    data: clients
  });
});

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private/Admin
export const getClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: client
  });
});

// @desc    Create new client
// @route   POST /api/clients
// @access  Private/Admin
export const createClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const client = await Client.create(req.body);

  res.status(201).json({
    success: true,
    data: client
  });
});

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private/Admin
export const updateClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let client = await Client.findById(req.params.id);

  if (!client) {
    return next(new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
  }

  client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: client
  });
});

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private/Admin
export const deleteClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
  }

  await client.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Search clients by phone
// @route   GET /api/clients/search/phone/:phone
// @access  Private/Admin
export const searchClientByPhone = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const client = await Client.findOne({ phone: req.params.phone });

  if (!client) {
    return next(new ErrorResponse(`Client not found with phone ${req.params.phone}`, 404));
  }

  res.status(200).json({
    success: true,
    data: client
  });
});
