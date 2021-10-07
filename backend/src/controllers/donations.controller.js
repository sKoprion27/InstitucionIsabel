import { response } from './../utils/response'
import { Donation } from './../models/Donation.model'

// GET ALL
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
}
