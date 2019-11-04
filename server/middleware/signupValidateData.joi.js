import Joi from 'joi';

const checkNewUser = (req, res, next) => {
  const UserSchemas = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(20)
      .required(),
    lastname: Joi.string().alphanum().min(3).max(20)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    // eslint-disable-next-line no-useless-escape
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
  });
  const schema = Joi.validate(req.body, UserSchemas);
  if (schema.error) {
    const errors = [];
    for (let i = 0; i < schema.error.details.length; i += 1) {
      errors.push(schema.error.details[i].message.split('"').join(' '));
    }
    if (errors[0].startsWith(' password  with value')) {
      const message = 'Your Password Must be at least 1 lowercase,1 uppercase,1 numeric character, one special character, be eight characters or longer';
      return res.status(400).json({
        status: 400,
        error: message,
      });
    }
    return res.status(400).json({
      status: 400,
      error: errors[0],
    });
  }
  next();
};
export default checkNewUser;
