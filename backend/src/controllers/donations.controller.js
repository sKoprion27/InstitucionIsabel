import { response } from './../utils/response'
import { Donation } from './../models/Donation.model'

export const donationController = {
  // GET ALL
  getDonations: async (req, res) => {
    try {
      const { rows } = await Donation.getAll()
      response(req, res, 'GET DONATIONS', rows, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET DONATIONS', null, 500)
    }
  },

  // GET ONE
  getOneDonation: async (req, res) => {
    const { id } = req.params
    try {
      const { rows, rowCount } = await Donation.getOne(id)
      if (rowCount === 0) {
        response(req, res, 'ERROR GET ONE DONATION', null, 500)
      }
      response(req, res, 'GET ONE DONATION', rows[0], 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET ONE DONATION', null, 500)
    }
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
