import { response } from '../utils/response'
import { TypesDonations } from '../models/TypesDonations.model'

// GET ALL
export const getTypesDonations = async (req, res) => {
  const typesDonations = await TypesDonations.getAll() // plurar
  response(req, res, 'GET TypesDonations', typesDonations, 200)
}
// GET ONE
export const getOneTypesDonation = async (req, res) => {
  const { id } = req.params // preguntar que hacer params
  const typesDonation = await TypesDonations.getOne(id)
  response(req, res, `GET ONE TypesDonations ${id}`, typesDonation, 200)
}

// POST ONE

export const postOneTypesDonation = async (req, res) => {
  const typesDonations = req.body
  console.log(typesDonations)
  await TypesDonations.postOne(typesDonations)
  console.log(':)')
  response(req, res, `POST ONE TypesDonation ${JSON.stringify(typesDonations)}`, ':D', 201)
}
