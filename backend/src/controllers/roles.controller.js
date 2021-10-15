import { response } from './../utils/response'
import { Role } from '../models/Role.model'

// GET ALL
export const getRoles = async (req, res) => {
  const roles = await Role.getAll()
  response(req, res, 'GET Roles', roles, 200)
}

// GET ONE
export const getOneRole = async (req, res) => {
  const { id } = req.params
  const role = await Role.getOne(id)
  response(req, res, 'GET ONE Role', role, 200)
}

// POST ONE

export const postOneRole = async (req, res) => {
  const role = req.body
  const queryAnswer = await Role.postOne(role)
  response(req, res, 'POST ONE Role', queryAnswer, 201)
}

// UPDATE ONE
export const updateOneRole = async (req, res) => {
  console.log('ID to UPDATE 😀', req.params.id)
  response(req, res, 'PUT ONE Roles', req.params.id, 201)
}

// DELETE ONE
export const deleteOneRole = async (req, res) => {
  console.log('ID to DELETE 😀', req.params.id)
  response(req, res, 'DELETE ONE Roles', req.params.id, 201)
}
