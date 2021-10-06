import { response } from './../utils/response'
import { State } from './../models/State.model'

export const getState = async (req, res) => {
  const states = await State.getAll()
  response(req, res, 'GET STATES', states, 200)
}

export const getOneState = async (req, res) => {
  const { id } = req.params
  const state = await State.getOne(id)
  response(req, res, 'GET ONE STATE', state, 200)
}

export const postOneState = async (req, res) => {
  const state = {
    ...req.body
  }
  const queryAnswer = await State.postOne(state)
  response(req, res, 'POST ONE STATE', queryAnswer, 201)
}

export const updateOneState = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'PUT this State: ' + id + ' 🍟' })
}

export const deleteOneState = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'DELETE this State: ' + id + ' 🥞' })
}
