import express from 'express';
import { registerTherapist, loginTherapist } from '../controllers/therapistController.js';

const router = express.Router();

router.post('/register', registerTherapist);
router.post('/login', loginTherapist);

export default router;
