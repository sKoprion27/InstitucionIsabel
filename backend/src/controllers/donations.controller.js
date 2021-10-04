import { response } from './../utils/response'

// GET ALL
export const getDonation = (req, res) => {
  response(req, res, 'GET donations', 200)
}

// GET ONE
export const getOneDonation = (req, res) => {
  const { id } = req.params
  console.log('Donacion que quiero consultar', id)
  response(req, res, `GET ONE Donation ${id}`, 200)
}

// POST ONE

export const postOneDonation = (req, res) => {
  const DonationToPost = req.body
  console.log(DonationToPost)
  response(req, res, `POST ONE Donation ${JSON.stringify(DonationToPost)}`, 201)
}

// UPDATE ONE
export const updateOneDonation = (req, res) => {
  console.log('ID to UPDATE 😀', req.params.id)
  response(req, res, 'PUT ONE Donation', 201)
}

// DELETE ONE
export const deleteOneDonation = (req, res) => {
  console.log('ID to DELETE 😀', req.params.id)
  response(req, res, 'DELETE ONE Donation', 201)
}
