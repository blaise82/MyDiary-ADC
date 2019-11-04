import jwt from 'jsonwebtoken';
import conn from '../../database/connect';

async function checkToken(req, res, next) {
  const token = await req.headers.auth;
  let InUserEmail;
  if (typeof token !== 'undefined') {
    jwt.verify(token, process.env.SECRET, async (err, result) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).send({
            status: 403,
            error: 'TokenExpired',
          });
        }
      } else {
        InUserEmail = result.email;
        const verified = jwt.verify(token, process.env.SECRET);
        req.tokenData = verified;
      }
    });

    const findAllQuery = 'SELECT * FROM users WHERE email=$1';
    try {
      const { rowCount } = await conn.query(findAllQuery, [InUserEmail]);
      if (!rowCount) {
        return res.status(401).send({
          status: 401,
          error: 'not authorized to do the task',
        });
      }next();
    } catch (e) {
      return res.status(400).send(e.message);
    }
  } else {
    res.status(403).send({
      status: 403,
      error: 'not authorized to do the task(forbidden)',
    });
  }
}
export default checkToken;
