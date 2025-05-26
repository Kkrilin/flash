import express from 'express';
import {
  createActivity,
  getAllActivity,
  updateActivity,
  deleteActivity,
  getDashboardActivity,
} from '../services/activity.js';

const router = express();

router.post('/', createActivity);
router.get('/', getAllActivity);
router.get('/dashboard', getDashboardActivity);
router.put('/:activityId', updateActivity);
router.delete('/:activityId', deleteActivity);

export default router;
