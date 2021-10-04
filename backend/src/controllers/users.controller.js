import { response } from './../utils/response'
import { db } from './../database/index'
import { encrypt } from './../lib/encrypt'
import { User } from './../models/User.model'

// GET ALL
export const getUsers = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM usuarios')
  response(req, res, 'GET USERS', rows, 200)
}

// GET ONE
export const getOneUser = async (req, res) => {
  const { id } = req.params
  console.log('Usuario que quiero consultar', id)
  const { rows } = await db.query('SELECT * FROM usuarios WHERE id = $1', [id])
  response(req, res, 'GET ONE USER', rows[0], 200)
}

// POST ONE

export const postOneUser = async (req, res) => {
  const passwordHashed = encrypt.createHash(req.body.password)
  const user = {
    ...req.body,
    password: passwordHashed
  }
  const queryAnswer = await User.postOneUser(user)
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
