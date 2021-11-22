import { response } from './../utils/response'
import { State } from './../models/State.model'

export const stateController = {

  // GET ALL
  getStates: async (req, res) => {
    try {
      const { rows } = await State.getAll()
      response(req, res, 'GET STATES', rows, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET STATES', null, 500)
    }
  },

  // GET ONE
  getOneState: async (req, res) => {
    const { id } = req.params
    try {
      const { rows, rowCount } = await State.getOne(id)
      if (rowCount === 0) {
        response(req, res, 'ERROR GET STATE', null, 500)
        return
      }
      response(req, res, 'GET STATE', rows[0], 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET STATE', null, 500)
    }
  },
  postOneState: async (req, res) => {
    try {
      const state = { ...req.body }
      const { rowCount } = await State.postOne(state)
      response(req, res, 'POST ONE STATE', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE STATE', null, 500)
    }
  },
  // UPDATE ONE
  updateOneState: async (req, res) => {
    try {
      const state = req.body
      const id = req.params.id
      const { rowCount } = await State.putOne(state, id)
      response(req, res, 'UPDATE ONE STATE', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR UPDATE ONE STATE', null, 500)
    }
  },
  // DELETE ONE
  deleteOneState: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await State.deleteOne(id)
      response(req, res, 'DELETE ONE STATE', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE STATE', null, 500)
    }
  }
}
