import { response } from './../utils/response'
import { validator } from '../lib/validator'
import {
  userPasswordSchema,
  userPostSchema
} from '../schemas/user.schema'

// Middleware validator
export const validateUserFields = async (req, res, next) => {
  const { id, ...body } = req.body
  const { err } = await validator.validateSchema(userPostSchema, body)
  console.log(err)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}

export const validatePasswordUser = async (req, res, next) => {
  const { err } = await validator.validateSchema(userPasswordSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}
