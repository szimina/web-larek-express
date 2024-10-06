import Joi from 'joi';

const orderSchema = Joi.object().keys({
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().min(1).required(),
  items: Joi.array().items(Joi.string()).required(),
});

export default orderSchema;
