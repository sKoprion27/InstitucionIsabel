import { response } from './../utils/response'
import { Permission } from '../models/Permission.model'

// GET ALL
export const getPermissions = async (req, res) => {
  const [queryAnswer, status] = await Permission.getAll()
  response(req, res, 'GET Permission', queryAnswer, status)
}

// GET ONE
export const getOnePermission = async (req, res) => {
  const { id } = req.params
  const [queryAnswer, status] = await Permission.getOne(id)
  response(req, res, 'GET ONE Permission', queryAnswer, status)
}

// POST ONE

export const postOnePermission = async (req, res) => {
  const permission = req.body
  const [queryAnswer, status] = await Permission.postOne(permission)
  response(req, res, 'POST ONE Permission', queryAnswer, status)
}

// UPDATE ONE
export const updateOnePermission = async (req, res) => {
  const { id } = req.params
  const [queryAnswer, status] = await Permission.putOne(req.body, id)
  response(req, res, 'PUT ONE Permission', queryAnswer, status)
}

// DELETE ONE
export const deleteOnePermission = async (req, res) => {
  const { id } = req.params
  const [queryAnswer, status] = await Permission.deleteOne(id)
  response(req, res, 'DELETE ONE Permission', queryAnswer, status)
}
