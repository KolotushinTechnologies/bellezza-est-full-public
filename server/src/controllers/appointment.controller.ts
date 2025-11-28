import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Appointment from '../models/appointment.model';
import ErrorResponse from '../utils/error-response';
import asyncHandler from '../utils/async-handler';

// @desc    Get all appointments with filtering, sorting, pagination
// @route   GET /api/appointments
// @access  Private/Admin
export const getAppointments = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'date', 'status'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = Appointment.find(JSON.parse(queryStr));

  // Filter by date if provided
  if (req.query.date) {
    const date = new Date(req.query.date as string);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    query = query.find({ date: { $gte: date, $lt: nextDay } });
  }

  // Filter by status if provided
  if (req.query.status) {
    query = query.find({ status: req.query.status });
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
    query = query.sort('date startTime');
  }

  // Pagination
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Appointment.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Populate with client and service
  query = query.populate([
    { path: 'client', select: 'name phone email' },
    { path: 'service', select: 'title description' }
  ]);

  // Executing query
  const appointments = await query;

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
    count: appointments.length,
    pagination,
    data: appointments
  });
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private/Admin
export const getAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const appointment = await Appointment.findById(req.params.id).populate([
    { path: 'client', select: 'name phone email' },
    { path: 'service', select: 'title description' }
  ]);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private/Admin
export const createAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Validate client
  if (req.body.client) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(req.body.client);
      if (!isValidId) {
        return next(new ErrorResponse(`Invalid client ID`, 400));
      }
    } catch (err) {
      return next(new ErrorResponse(`Invalid client ID`, 400));
    }
  }

  // Validate service
  if (req.body.service) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(req.body.service);
      if (!isValidId) {
        return next(new ErrorResponse(`Invalid service ID`, 400));
      }
    } catch (err) {
      return next(new ErrorResponse(`Invalid service ID`, 400));
    }
  }

  // Check for time conflicts
  const conflictingAppointment = await Appointment.findOne({
    date: req.body.date,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      {
        startTime: { $lte: req.body.startTime },
        endTime: { $gt: req.body.startTime }
      },
      {
        startTime: { $lt: req.body.endTime },
        endTime: { $gte: req.body.endTime }
      },
      {
        startTime: { $gte: req.body.startTime },
        endTime: { $lte: req.body.endTime }
      }
    ]
  });

  if (conflictingAppointment) {
    return next(new ErrorResponse(`Time slot is already booked`, 400));
  }

  let appointment = await Appointment.create(req.body);

  // Populate client and service
  appointment = await Appointment.findById(appointment._id).populate([
    { path: 'client', select: 'name phone email' },
    { path: 'service', select: 'title description' }
  ]) as any;

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private/Admin
export const updateAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  // Validate client if provided
  if (req.body.client) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(req.body.client);
      if (!isValidId) {
        return next(new ErrorResponse(`Invalid client ID`, 400));
      }
    } catch (err) {
      return next(new ErrorResponse(`Invalid client ID`, 400));
    }
  }

  // Validate service if provided
  if (req.body.service) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(req.body.service);
      if (!isValidId) {
        return next(new ErrorResponse(`Invalid service ID`, 400));
      }
    } catch (err) {
      return next(new ErrorResponse(`Invalid service ID`, 400));
    }
  }

  // Check for time conflicts if date or time is being updated
  if (req.body.date || req.body.startTime || req.body.endTime) {
    const checkDate = req.body.date || appointment.date;
    const checkStartTime = req.body.startTime || appointment.startTime;
    const checkEndTime = req.body.endTime || appointment.endTime;

    const conflictingAppointment = await Appointment.findOne({
      _id: { $ne: req.params.id },
      date: checkDate,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        {
          startTime: { $lte: checkStartTime },
          endTime: { $gt: checkStartTime }
        },
        {
          startTime: { $lt: checkEndTime },
          endTime: { $gte: checkEndTime }
        },
        {
          startTime: { $gte: checkStartTime },
          endTime: { $lte: checkEndTime }
        }
      ]
    });

    if (conflictingAppointment) {
      return next(new ErrorResponse(`Time slot is already booked`, 400));
    }
  }

  appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate([
    { path: 'client', select: 'name phone email' },
    { path: 'service', select: 'title description' }
  ]);

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
export const deleteAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get appointments by client
// @route   GET /api/appointments/client/:clientId
// @access  Private/Admin
export const getAppointmentsByClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const appointments = await Appointment.find({ client: req.params.clientId })
    .sort('date startTime')
    .populate([
      { path: 'client', select: 'name phone email' },
      { path: 'service', select: 'title description' }
    ]);

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Get appointments by date range
// @route   GET /api/appointments/range
// @access  Private/Admin
export const getAppointmentsByDateRange = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return next(new ErrorResponse(`Please provide startDate and endDate`, 400));
  }

  const appointments = await Appointment.find({
    date: {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string)
    }
  })
    .sort('date startTime')
    .populate([
      { path: 'client', select: 'name phone email' },
      { path: 'service', select: 'title description' }
    ]);

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});
