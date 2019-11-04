import express from 'express';
import signupValidateData from '../../middleware/v1/signupValidateData.joi';
import signinValidateData from '../../middleware/v1/signinValidateData.joi';
import User from '../../controllers/v2/users';

const router = express.Router();

router.post('/signup', signupValidateData, User.signUp);
router.post('/signin', signinValidateData, User.signIn);

export default router;
