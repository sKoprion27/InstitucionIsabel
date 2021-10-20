import { response } from './../utils/response'
import { Donation } from './../models/Donation.model'

export const donationController = {
  getDonations: async (req, res) => {
    const [queryAnswer, status] = await Donation.getAll()
    response(req, res, 'GET DONATIONS', queryAnswer, status)
  },
  getOneDonation: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await Donation.getOne(id)
    response(req, res, 'GET ONE DONATION', queryAnswer, status)
  },
  postOneDonation: async (req, res) => {
    const donor = { ...req.body }
    const [queryAnswer, status] = await Donation.postOne(donor)
    response(req, res, 'POST ONE DONATION', queryAnswer, status)
  },
  updateOneDonation: async (req, res) => {
    const donor = req.body
    const id = req.params.id
    const [queryAnswer, status] = await Donation.putOne(donor, id)
    response(req, res, 'UPDATE ONE DONATION', queryAnswer, status)
  },
  deleteOneDonation: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await Donation.deleteOne(id)
    response(req, res, 'DELETE ONE USER', queryAnswer, status)
  }
}

/* // GET ALL
export const getDonation = async (req, res) => {
  const donations = await Donation.getAll()
  response(req, res, 'GET donations', donations, 200)
}

// GET ONE
export const getOneDonation = async (req, res) => {
  const { id } = req.params
  const donation = await Donation.getOne(id)
  console.log('Donacion que quiero consultar', id)
  response(req, res, `GET ONE Donation ${id}`, donation, 200)
}

// POST ONE

export const postOneDonation = async (req, res) => {
  const donation = req.body
  console.log(donation)
  await Donation.postOne(donation)
  response(req, res, `POST ONE Donation ${JSON.stringify(donation)}`, ':D', 201)
}

// UPDATE ONE
export const updateOneDonation = (req, res) => {
  console.log('ID to UPDATE 😀', req.params.id)
  response(req, res, 'PUT ONE Donation', {}, 201)
}

// DELETE ONE
export const deleteOneDonation = (req, res) => {
  console.log('ID to DELETE 😀', req.params.id)
  response(req, res, 'DELETE ONE Donation', {}, 201)
} */
