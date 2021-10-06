import { response } from './../utils/response'
import { Donor } from './../models/Donor.model'

export const getDonors = async (req, res) => {
  const donors = await Donor.getAll()
  response(req, res, 'GET DONORS', donors, 200)
}

export const getOneDonor = async (req, res) => {
  const { id } = req.params
<<<<<<< HEAD
  // paso de db
  res.status(200).json({ message: 'GET this donor: ' + id })
=======
  const donor = await Donor.getOne(id)
  response(req, res, 'GET ONE DONOR', donor, 200)
>>>>>>> a346aaa97acf9fa26a6559b35512383ebd06e2a4
}

// Dudas (?)
export const postOneDonor = async (req, res) => {
  const donor = {
    ...req.body
  }
  const queryAnswer = await Donor.postOneDonor(donor)
  response(req, res, 'POST ONE DONOR', queryAnswer, 201)
}

export const updateOneDonor = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'UPDATE this donor: ' + id + ' ✏️' })
}

export const deleteOneDonor = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'DELETE this donor: ' + id + ' 😢' })
}
