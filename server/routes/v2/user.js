import express from 'express';
import signupValidateData from '../../middleware/v1/signupValidateData.joi';
import signinValidateData from '../../middleware/v1/signinValidateData.joi';
import User from '../../controllers/v2/users';

import checkToken from '../../middleware/v2/authenticate';

const router = express.Router();

router.post('/signup', signupValidateData, User.signUp);
router.post('/signin', signinValidateData, User.signIn);
router.patch('/reminder', checkToken, User.updateReminder);


export default router;
