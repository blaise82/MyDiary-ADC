import express from 'express';
import signupValidateData from '../middleware/signupValidateData.joi';
import User from '../controllers/User';

const router = express.Router();

router.post('/signup', signupValidateData, User.signUp);

export default router;
