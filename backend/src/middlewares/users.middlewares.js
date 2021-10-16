import { response } from './../utils/response'
import { validator } from '../lib/validator'
import { userPostSchema } from '../schemas/user.schema'

// Middleware validator
export const validateUserFields = async (req, res, next) => {
  const { err } = await validator.validateSchema(userPostSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}
