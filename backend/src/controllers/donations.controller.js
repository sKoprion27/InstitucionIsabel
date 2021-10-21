import { response } from './../utils/response'
import { Donation } from './../models/Donation.model'

export const donationController = {
  // GET ALL
  getDonations: async (req, res) => {
    const [queryAnswer, status] = await Donation.getAll()
    response(req, res, 'GET DONATIONS', queryAnswer, status)
  },

  // GET ONE
  getOneDonation: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await Donation.getOne(id)
    response(req, res, 'GET ONE DONATION', queryAnswer, status)
  },

  // POST ONE
  postOneDonation: async (req, res) => {
    const donor = { ...req.body }
    const [queryAnswer, status] = await Donation.postOne(donor)
    response(req, res, 'POST ONE DONATION', queryAnswer, status)
  },

  // UPDATE ONE
  updateOneDonation: async (req, res) => {
    const donor = req.body
    const id = req.params.id
    const [queryAnswer, status] = await Donation.putOne(donor, id)
    response(req, res, 'UPDATE ONE DONATION', queryAnswer, status)
  },

  // DELETE ONE
  deleteOneDonation: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await Donation.deleteOne(id)
    response(req, res, 'DELETE ONE USER', queryAnswer, status)
  }
}
