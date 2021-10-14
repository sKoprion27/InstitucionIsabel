import { response } from '../utils/response'
import { TipoDonaciones } from '../models/TipoDonaciones.model'

// GET ALL
export const getTipoDonaciones = async (req, res) => {
  const tipoDonacion = await TipoDonaciones.getAll() // plurar
  response(req, res, 'GET TipoDonacioness', tipoDonacion, 200)
}
// GET ONE
export const getOneTipoDonaciones = async (req, res) => {
  const { id } = req.params // preguntar que hacer params
  const tipoDonacion = await TipoDonaciones.getOne(id)
  response(req, res, `GET ONE TipoDonaciones ${id}`, tipoDonacion, 200)
}
