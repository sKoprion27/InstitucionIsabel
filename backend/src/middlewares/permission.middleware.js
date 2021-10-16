import { response } from './../utils/response'
import { validator } from '../lib/validator'
import { permissionPostSchema } from '../schemas/permission.schema'

// Middleware validator
export const validatePermissionFields = async (req, res, next) => {
  const { err } = await validator.validateSchema(permissionPostSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}
