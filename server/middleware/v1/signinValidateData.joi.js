import Joi from 'joi';

const checkNewUser = (req, res, next) => {
  const UserSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).max(20).required(),
  });
  const schema = Joi.validate(req.body, UserSchema);
  if (schema.error) {
    const error = [];
    for (let i = 0; i < schema.error.details.length; i += 1) {
      error.push(schema.error.details[i].message.split('"').join(' '));
    }
    return res.status(400).json({
      status: 400,
      error: error[0],
    });
  }
  next();
};
export default checkNewUser;
