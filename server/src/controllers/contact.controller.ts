import { Request, Response, NextFunction } from 'express';
import Contact from '../models/contact.model';
import ErrorResponse from '../utils/error-response';
import asyncHandler from '../utils/async-handler';

// @desc    Get contact info (returns the first/only contact record)
// @route   GET /api/contacts
// @access  Public
export const getContact = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Get the first contact record (there should only be one)
  let contact = await Contact.findOne();

  // If no contact exists, create a default one
  if (!contact) {
    contact = await Contact.create({
      phone: '+7 (XXX) XXX-XX-XX',
      instagram: '@bellezza_estetica_nhk',
      address: 'г. Находка, Приморский край'
    });
  }

  res.status(200).json({
    success: true,
    data: contact
  });
});

// @desc    Update contact info
// @route   PUT /api/contacts
// @access  Private/Admin
export const updateContact = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { phone, instagram, address } = req.body;

  // Get the first contact record
  let contact = await Contact.findOne();

  if (!contact) {
    // If no contact exists, create one
    contact = await Contact.create({
      phone: phone || '+7 (XXX) XXX-XX-XX',
      instagram: instagram || '@bellezza_estetica_nhk',
      address: address || 'г. Находка, Приморский край'
    });
  } else {
    // Update existing contact
    contact = await Contact.findByIdAndUpdate(
      contact._id,
      { phone, instagram, address },
      {
        new: true,
        runValidators: true
      }
    );
  }

  res.status(200).json({
    success: true,
    data: contact
  });
});
