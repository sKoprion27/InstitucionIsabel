import { response } from './../utils/response'
import { encrypt } from './../lib/encrypt'
import { User } from './../models/User.model'

// GET ALL
export const getUsers = async (req, res) => {
  const users = await User.getAll()
  response(req, res, 'GET USERS', users, 200)
}

// GET ONE
export const getOneUser = async (req, res) => {
  const { id } = req.params
  const user = await User.getOne(id)
  response(req, res, 'GET ONE USER', user, 200)
}

// POST ONE

export const postOneUser = async (req, res) => {
  const passwordHashed = encrypt.createHash(req.body.password)
  const user = {
    ...req.body,
    password: passwordHashed
  }
  const queryAnswer = await User.postOne(user)
  response(req, res, 'POST ONE USER', queryAnswer, 201)
}

// UPDATE ONE
export const updateOneUser = async (req, res) => {
  console.log('ID to UPDATE 😀', req.params.id)
  response(req, res, 'PUT ONE USER', req.params.id, 201)
}

// DELETE ONE
export const deleteOneUser = async (req, res) => {
  console.log('ID to DELETE 😀', req.params.id)
  response(req, res, 'DELETE ONE USER', req.params.id, 201)
}
