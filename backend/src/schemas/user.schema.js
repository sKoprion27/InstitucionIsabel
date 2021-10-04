/* eslint-disable prefer-regex-literals */

import Joi from 'joi'

export const userSchema = Joi.object({
  nombre: Joi.string().min(2).max(30).required(),
  apellido: Joi.string().min(2).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
  correo_electronico: Joi.string().email().required(),
  id_role: Joi.number().min(1).required()
})
