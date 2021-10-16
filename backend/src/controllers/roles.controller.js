import { response } from './../utils/response'
import { Role } from '../models/Role.model'

export const rolesController = {
  // GET ALL
  getRoles: async (req, res) => {
    const [roles, status] = await Role.getAll()
    response(req, res, 'GET Roles', roles, status)
  },

  // GET ONE
  getOneRole: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await Role.getOne(id)
    response(req, res, 'GET ONE Role', queryAnswer, status)
  },
  // POST ONE

  postOneRole: async (req, res) => {
    const role = req.body
    const [queryAnswer, status] = await Role.postOne(role)
    response(req, res, 'POST ONE Role', queryAnswer, status)
  },

  // UPDATE ONE
  updateOneRole: async (req, res) => {
    const { id } = req.params
    const role = req.body
    const [queryAnswer, status] = await Role.putOne(role, id)
    response(req, res, 'PUT ONE Role', queryAnswer, status)
  },
  // DELETE ONE
  deleteOneRole: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await Role.deleteOne(id)
    response(req, res, 'DELETE ONE Role', queryAnswer, status)
  }

}
