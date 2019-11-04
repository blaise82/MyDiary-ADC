import Joi from 'joi';

const validateParams = (req, res, next) => {
  const UserSchemas = Joi.object().keys({
    id: Joi.string().guid(),
  });
  const schema = Joi.validate(req.params, UserSchemas);
  if (schema.error) {
    const errors = [];
    for (let i = 0; i < schema.error.details.length; i += 1) {
      errors.push(schema.error.details[i].message.split('"').join(' '));
    }
    return res.status(400).json({
      status: 400,
      error: errors[0],
    });
  }
  next();
};
export default validateParams;
