import { response } from './../utils/response'
import { validator } from '../lib/validator'
import { TypeDonationsSchema } from '../schemas/TypesDonations.schema'

// Middleware validator
export const validateTypeDonations = async (req, res, next) => {
  const { err } = await validator.validateSchema(TypeDonationsSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}
