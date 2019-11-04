import Joi from 'joi';

const checkNewEntry = (req, res, next) => {
  const UserSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });
  const schema = Joi.validate(req.body, UserSchema);
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
export default checkNewEntry;
