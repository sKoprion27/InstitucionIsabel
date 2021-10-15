import { response } from './../utils/response'
import { Permission } from '../models/Permission.model'

// GET ALL
export const getPermissions = async (req, res) => {
  const permissions = await Permission.getAll()
  response(req, res, 'GET Permission', permissions, 200)
}

// GET ONE
export const getOnePermission = async (req, res) => {
  const { id } = req.params
  const permission = await Permission.getOne(id)
  response(req, res, 'GET ONE Permission', permission, 200)
}

// POST ONE

export const postOnePermission = async (req, res) => {
  const permission = req.body
  const queryAnswer = await Permission.postOne(permission)
  response(req, res, 'POST ONE Permission', queryAnswer, 201)
}

// UPDATE ONE
export const updateOnePermission = async (req, res) => {
  console.log('ID to UPDATE 😀', req.params.id)
  response(req, res, 'PUT ONE Permission', req.params.id, 201)
}

// DELETE ONE
export const deleteOnePermission = async (req, res) => {
  console.log('ID to DELETE 😀', req.params.id)
  response(req, res, 'DELETE ONE Permission', req.params.id, 201)
}
