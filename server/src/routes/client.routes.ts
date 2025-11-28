import express from 'express';
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  searchClientByPhone,
} from '../controllers/client.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// All routes are protected (admin only)
router.use(protect);
router.use(authorize('admin'));

router.get('/', getClients);
router.get('/search/phone/:phone', searchClientByPhone);
router.get('/:id', getClient);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
