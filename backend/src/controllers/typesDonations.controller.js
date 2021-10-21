import { response } from '../utils/response'
import { TypesDonation } from '../models/TypesDonations.model'

export const typesDonationController = {
  // GET ALL
  getTypesDonations: async (req, res) => {
    const [queryAnswer, status] = await TypesDonation.getAll()
    response(req, res, 'GET DONATION TYPES', queryAnswer, status)
  },

  // GET ONE
  getOneTypesDonation: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await TypesDonation.getOne(id)
    response(req, res, 'GET ONE DONATION TYPE', queryAnswer, status)
  },

  // POST ONE
  postOneTypesDonation: async (req, res) => {
    const type = { ...req.body }
    const [queryAnswer, status] = await TypesDonation.postOne(type)
    response(req, res, 'POST ONE DONATION', queryAnswer, status)
  },

  // UPDATE ONE
  updateOneTypesDonation: async (req, res) => {
    const type = req.body
    const id = req.params.id
    const [queryAnswer, status] = await TypesDonation.putOne(type, id)
    response(req, res, 'UPDATE ONE DONATION TYPE', queryAnswer, status)
  },

  // DELETE ONE
  deleteOneTypesDonation: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await TypesDonation.deleteOne(id)
    response(req, res, 'DELETE ONE DONATION TYPE', queryAnswer, status)
  }
}
