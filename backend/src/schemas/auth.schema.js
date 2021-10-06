/* eslint-disable prefer-regex-literals */
import Joi from 'joi'

export const loginSchema = Joi.object({
  correo_electronico: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required()
})
