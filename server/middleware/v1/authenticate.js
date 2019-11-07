import jwt from 'jsonwebtoken';
import userModel from '../../models/User';

const checkToken = async (req, res, next) => {
  const token = await req.headers.auth;
  let InUserEmail;
  if (typeof token !== 'undefined') {
    jwt.verify(token, 'Secret Key', async (err, result) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({
            status: 403,
            error: 'TokenExpired',
          });
        }
      } else {
        InUserEmail = result.email;
        const verified = jwt.verify(token, 'Secret Key');
        req.tokenData = verified;
      }
    });
    const authUser = userModel.users.find((user) => user.email === InUserEmail);
    if (!authUser) {
      return res.status(401).json({
        status: 401,
        error: 'not authorized to do the task',
      });
    } next();
  } else {
    res.status(403).json({
      status: 403,
      error: 'not authorized to do the task(forbidden)',
    });
  }
};
export default checkToken;
