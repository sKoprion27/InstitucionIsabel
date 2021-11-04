import { response } from '../utils/response'
import { TypesDonation } from '../models/TypesDonations.model'

export const typesDonationController = {
  // GET ALL
  getTypesDonations: async (req, res) => {
    try {
      const { rows } = await TypesDonation.getAll()
      response(req, res, 'GET DONATION TYPES', rows, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET DONATION TYPES', null, 500)
    }
  },

  // GET ONE
  getOneTypesDonation: async (req, res) => {
    try {
      const { id } = req.params
      const { rows, rowCount } = await TypesDonation.getOne(id)
      if (rowCount === 0) {
        response(req, res, 'ERROR GET ONE DONATION TYPE', null, 500)
        return
      }
      response(req, res, 'GET ONE DONATION TYPE', rows[0], 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET ONE DONATION TYPE', null, 500)
    }
  },

  // POST ONE
  postOneTypesDonation: async (req, res) => {
    try {
      const type = { ...req.body }
      const { rowCount } = await TypesDonation.postOne(type)
      response(req, res, 'POST ONE DONATION', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE DONATION', null, 500)
    }
  },

  // UPDATE ONE
  updateOneTypesDonation: async (req, res) => {
    try {
      const type = req.body
      console.log(type, 'TYPE')
      const id = req.params.id
      const { rowCount } = await TypesDonation.putOne(type, id)
      response(req, res, 'UPDATE ONE DONATION TYPE', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR UPDATE ONE DONATION TYPE', null, 500)
    }
  },

  // DELETE ONE
  deleteOneTypesDonation: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await TypesDonation.deleteOne(id)
      response(req, res, 'DELETE ONE DONATION TYPE', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE DONATION TYPE', null, 500)
    }
  }
}
