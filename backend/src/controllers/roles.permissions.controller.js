import { response } from '../utils/response'
import { RolePermission } from '../models/RolePermission.model'
import { Role } from '../models/Role.model'

export const rpController = {
  // GET ALL
  getOneRoleAllPermissions: async (req, res) => {
    const { idRole } = req.params
    console.log('😁')
    const [role] = await Role.getOne(idRole)
    const [permissions, status] = await RolePermission.getRoleAllPermissions(idRole)

    const data = {
      role: role.nombre_role,
      permissions: permissions
    }

    response(req, res, 'GET ONE Role ALL Permissions', data, status)
  },

  // GET ONE
  getOneRoleOnePermission: async (req, res) => {
    const { idRole, idPermission } = req.params
    const [role] = await Role.getOne(idRole)
    const [permission, status] = await RolePermission.getOneRoleOnePermission(idRole, idPermission)

    const data = {
      role: role.nombre_role,
      permission
    }
    response(req, res, 'GET ONE Role Permission', data, status)
  },

  // POST ONE
  postRoleOnePermission: async (req, res) => {
    const role_permission = req.body
    const queryAnswer = await RolePermission.postOne(role_permission)
    response(req, res, 'POST ONE Role Permission', queryAnswer, 201)
  },
  // UPDATE ONE
  updateRoleOnePermission: async (req, res) => {
    const { id } = req.params
    const rolePermission = req.body
    const [queryAnswer, status] = await RolePermission.putOne(rolePermission, id)
    response(req, res, 'PUT ONE Role Permission', queryAnswer, status)
  },
  // DELETE ONE
  deleteRoleOnePermission: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await RolePermission.deleteOne(id)
    response(req, res, 'PUT ONE Role Permission', queryAnswer, status)
  }
}
