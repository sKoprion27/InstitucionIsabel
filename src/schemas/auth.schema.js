import Joi from 'joi'

export const loginSchema = Joi.object({
  correo_electronico: Joi.string().email().required(),
  password: Joi.string().min(8).required()
})
