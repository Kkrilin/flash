import express from 'express';
import { getUser, updateUser } from '../services/user.js';

const router = express();

router.get('/', getUser);
router.post('/', updateUser);

export default router;
