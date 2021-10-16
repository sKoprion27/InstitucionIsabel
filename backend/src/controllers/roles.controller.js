import { response } from './../utils/response'
import { Role } from '../models/Role.model'

// GET ALL
export const getRoles = async (req, res) => {
  const [roles, status] = await Role.getAll()
  response(req, res, 'GET Roles', roles, status)
}

// GET ONE
export const getOneRole = async (req, res) => {
  const { id } = req.params
  const [queryAnswer, status] = await Role.getOne(id)
  response(req, res, 'GET ONE Role', queryAnswer, status)
}

// POST ONE

export const postOneRole = async (req, res) => {
  const role = req.body
  const [queryAnswer, status] = await Role.postOne(role)
  response(req, res, 'POST ONE Role', queryAnswer, status)
}

// UPDATE ONE
export const updateOneRole = async (req, res) => {
  const { id } = req.params
  const role = req.body
  const [queryAnswer, status] = await Role.putOne(role, id)
  response(req, res, 'PUT ONE Role', queryAnswer, status)
}

// DELETE ONE
export const deleteOneRole = async (req, res) => {
  const { id } = req.params
  const [queryAnswer, status] = await Role.deleteOne(id)
  response(req, res, 'DELETE ONE Role', queryAnswer, status)
}
