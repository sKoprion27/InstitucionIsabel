import { response } from './../utils/response'
import { validator } from '../lib/validator'
import { loginSchema } from '../schemas/auth.schema'

// Middleware validator
export const validateLoginFields = async (req, res, next) => {
  const { err } = await validator.validateSchema(loginSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}
