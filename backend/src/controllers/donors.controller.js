import { response } from './../utils/response'
import { Donor } from './../models/Donor.model'

export const donorController = {
  getDonors: async (req, res) => {
    try {
      const { rows } = await Donor.getAll()
      response(req, res, 'GET DONORS', rows, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET DONORS', null, 500)
    }
  },

  getOneDonor: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await Donor.getOne(id)
    response(req, res, 'GET ONE DONOR', queryAnswer, status)
  },
  postOneDonor: async (req, res) => {
    const donor = { ...req.body }
    const [queryAnswer, status] = await Donor.postOne(donor)
    response(req, res, 'POST ONE DONOR', queryAnswer, status)
  },
  updateOneDonor: async (req, res) => {
    const donor = req.body
    const id = req.params.id
    const [queryAnswer, status] = await Donor.putOne(donor, id)
    response(req, res, 'UPDATE ONE DONOR', queryAnswer, status)
  },
  deleteOneDonor: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await Donor.deleteOne(id)
    response(req, res, 'DELETE ONE USER', queryAnswer, status)
  }
}
