import { response } from './../utils/response'
import { Cfdi } from './../models/Cfdi.model'

export const getCFDI = async (req, res) => {
  const cfdis = await Cfdi.getAll()
  response(req, res, 'GET CFDIS', cfdis, 200)
}

export const getOneCFDI = async (req, res) => {
  const { id } = req.params
  const cfdi = await Cfdi.getOne(id)
  response(req, res, 'GET ONE CFDI', cfdi, 200)
}

// Dudas (?)
export const postOneCFDI = async (req, res) => {
  const cfdi = await Cfdi.postOne()
  response(req, res, 'POST ONE USER', cfdi, 201)
}

export const updateOneCFDI = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'PUT this CFDI: ' + id + ' 🐻' })
}

export const deleteOneCFDI = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'DELETE this CFDI: ' + id + ' 🦘' })
}
