import { response } from '../utils/response'
import { RolePermission } from '../models/RolePermission.model'

// GET ALL
export const getRolePermission = async (req, res) => {
  const [queryAnswer, status] = await RolePermission.getAll()
  response(req, res, 'GET Roles', queryAnswer, status)
}

// GET ONE
export const getOneRolePermission = async (req, res) => {
  const { id } = req.params
  const [queryAnswer, status] = await RolePermission.getOne(id)
  response(req, res, 'GET ONE Role', queryAnswer, status)
}

// POST ONE

export const postOneRolePermission = async (req, res) => {
  const role_permission = req.body
  const queryAnswer = await RolePermission.postOne(role_permission)
  response(req, res, 'POST ONE Role', queryAnswer, 201)
}

// UPDATE ONE
export const updateOneRolePermission = async (req, res) => {
  const { id } = req.params
  const rolePermission = req.body
  const [queryAnswer, status] = await RolePermission.putOne(rolePermission, id)
  response(req, res, 'PUT ONE Roles', queryAnswer, status)
}

// DELETE ONE
export const deleteOneRolePermission = async (req, res) => {
  const { id } = req.params
  const [queryAnswer, status] = await RolePermission.deleteOne(id)
  response(req, res, 'PUT ONE Roles', queryAnswer, status)
}
