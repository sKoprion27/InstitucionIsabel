import { response } from '../utils/response'
import { validator } from '../lib/validator'
import { permissionPostSchema, rolePermissionPostSchema, rolePostSchema } from './../schemas/roles.permissions.schema';

// Middleware validator
export const validatePermissionFields = async (req, res, next) => {
  const { err } = await validator.validateSchema(permissionPostSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}
export const validateRoleFields = async (req, res, next) => {
  const { err } = await validator.validateSchema(rolePostSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}

export const validateRolePermissionFields = async (req, res, next) => {
  const { err } = await validator.validateSchema(rolePermissionPostSchema, req.body)
  if (!err) {
    next()
  } else {
    response(req, res, 'ERROR', err, 400)
  }
}


