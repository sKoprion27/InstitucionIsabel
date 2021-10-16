import Joi from 'joi'

export const permissionPostSchema = Joi.object({
  nombre_permiso: Joi.string().min(2).max(30).required()
})

export const rolePostSchema = Joi.object({
  nombre_role: Joi.string().min(2).max(30).required()
})
