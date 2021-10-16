import Joi from 'joi'

export const TypeDonationsSchema = Joi.object({
  nombre: Joi.string().min(2).max(30).required(),
  descripcion: Joi.string().min(2).max(30).required()
})
