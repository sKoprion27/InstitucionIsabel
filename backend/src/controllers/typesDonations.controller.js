import { response } from '../utils/response'
import { TypesDonations } from '../models/TypesDonations.model'

// GET ALL
export const getTypesDonations = async (req, res) => {
  const typesDonations = await TypesDonations.getAll() // plurar
  response(req, res, 'GET TypesDonations', typesDonations, 200)
}
// GET ONE
export const getOneTypesDonations = async (req, res) => {
  const { id } = req.params // preguntar que hacer params
  const typesDonation = await TypesDonations.getOne(id)
  response(req, res, `GET ONE TypesDonations ${id}`, typesDonation, 200)
}
