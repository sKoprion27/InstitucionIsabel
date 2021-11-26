import Joi from 'joi'

export const userPostSchema = Joi.object({
  nombre: Joi.string().min(2).max(30).required(),
  apellido: Joi.string().min(2).max(30).required(),
  password: Joi.string().min(8).required(),
  correo_electronico: Joi.string().email().required(),
  roles: Joi.array().required()
})
export const userPasswordSchema = Joi.object({
  password:
    Joi.string()
      .min(8).required(),
  id: Joi.allow()
})
