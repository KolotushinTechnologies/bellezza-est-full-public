import express from 'express';
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByClient,
  getAppointmentsByDateRange,
} from '../controllers/appointment.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// All routes are protected (admin only)
router.use(protect);
router.use(authorize('admin'));

router.get('/', getAppointments);
router.get('/range', getAppointmentsByDateRange);
router.get('/client/:clientId', getAppointmentsByClient);
router.get('/:id', getAppointment);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
