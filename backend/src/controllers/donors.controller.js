import { response } from './../utils/response'
import { Donor } from './../models/Donor.model'

export const donorController = {
  getDonors: async (req, res) => {
    const [queryAnswer, status] = await Donor.getAll()
    response(req, res, 'GET DONORS', queryAnswer, status)
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
  }
}

/* export const getDonors = async (req, res) => {
  const donors = await Donor.getAll()
  response(req, res, 'GET DONORS', donors, 200)
}

export const getOneDonor = async (req, res) => {
  const { id } = req.params
  const donor = await Donor.getOne(id)
  response(req, res, 'GET ONE DONOR', donor, 200)
}

// Dudas (?)
export const postOneDonor = async (req, res) => {
  const donor = {
    ...req.body
  }
  const queryAnswer = await Donor.postOne(donor)
  response(req, res, 'POST ONE DONOR', queryAnswer, 201)
}

export const updateOneDonor = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'UPDATE this donor: ' + id + ' ✏️' })
}

export const deleteOneDonor = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'DELETE this donor: ' + id + ' 😢' })
} */
