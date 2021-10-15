import { response } from '../utils/response'
import { RolesPermissions } from '../models/RolesPermissions.model'

// GET ALL
export const getRolesPermissions = async (req, res) => {
  const roles_permissions = await RolesPermissions.getAll()
  response(req, res, 'GET Roles', roles_permissions, 200)
}

// GET ONE
export const getOneRolePermission = async (req, res) => {
  const { id } = req.params
  const role_permission = await RolesPermissions.getOne(id)
  response(req, res, 'GET ONE Role', role_permission, 200)
}

// POST ONE

export const postOneRolePermission = async (req, res) => {
  const role_permission = req.body
  const queryAnswer = await RolesPermissions.postOne(role_permission)
  response(req, res, 'POST ONE Role', queryAnswer, 201)
}

// UPDATE ONE
export const updateOneRolePermission = async (req, res) => {
  console.log('ID to UPDATE 😀', req.params.id)
  response(req, res, 'PUT ONE Roles', req.params.id, 201)
}

// DELETE ONE
export const deleteOneRolePermission = async (req, res) => {
  console.log('ID to DELETE 😀', req.params.id)
  response(req, res, 'DELETE ONE Roles', req.params.id, 201)
}
