import { response } from './../utils/response'
import { State } from './../models/State.model'

export const stateController = {

  // GET ALL
  getStates: async (req, res) => {
    const [queryAnswer, status] = await State.getAll()
    response(req, res, 'GET STATES', queryAnswer, status)
  },

  // GET ONE
  getOneState: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await State.getOne(id)
    response(req, res, 'GET ONE STATE', queryAnswer, status)
  },
  postOneState: async (req, res) => {
    const state = { ...req.body }
    const [queryAnswer, status] = await State.postOne(state)
    response(req, res, 'POST ONE STATE', queryAnswer, status)
  },
  // UPDATE ONE
  updateOneState: async (req, res) => {
    const state = req.body
    const id = req.params.id
    const [queryAnswer, status] = await State.putOne(state, id)
    response(req, res, 'UPDATE ONE STATE', queryAnswer, status)
  },
  // DELETE ONE
  deleteOneState: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await State.deleteOne(id)
    response(req, res, 'DELETE ONE STATE', queryAnswer, status)
  }
}
