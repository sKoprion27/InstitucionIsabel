import Joi from 'joi'

export const userPostSchema = Joi.object({
  nombre: Joi.string().min(2).max(30).required(),
  apellido: Joi.string().min(2).max(30).required(),
  password: Joi.string().min(8).required(),
  correo_electronico: Joi.string().email().required()
})
export const userPasswordSchema = Joi.object({ password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required() })
