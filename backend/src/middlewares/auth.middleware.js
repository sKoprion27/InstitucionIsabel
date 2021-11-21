import { response } from './../utils/response'
import { validator } from '../lib/validator'
import { loginSchema } from '../schemas/auth.schema'

// Middleware validator
export const validateLoginFields = async (req, res, next) => {
  const { err } = await validator.validateSchema(loginSchema, req.body)
  if (!err) {
    next()
  } else {
    console.log('Errs', err)
    response(req, res, 'Credenciales inválidas', err, 400)
  }
}
