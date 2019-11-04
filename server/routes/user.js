import express from 'express';
import signupValidateData from '../middleware/signupValidateData.joi';
import signinValidateData from '../middleware/signinValidateData.joi';
import User from '../controllers/User';

const router = express.Router();

router.post('/signup', signupValidateData, User.signUp);
router.post('/signin', signinValidateData, User.signIn);

export default router;
