import { response } from './../utils/response'
import { validateSchema } from '../lib/validator'
import { userSchema } from '../schemas/user.schema'

// Middleware validator
export const validateUser = async (req, res, next) => {
  const { err } = await validateSchema(userSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}
// Middleware encryptor
