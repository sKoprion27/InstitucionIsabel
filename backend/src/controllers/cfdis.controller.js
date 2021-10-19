import { response } from './../utils/response'
import { Cfdi } from './../models/Cfdi.model'

export const cfdiController = {

  // GET ALL
  getCfdis: async (req, res) => {
    const [queryAnswer, status] = await Cfdi.getAll()
    response(req, res, 'GET CFDIS', queryAnswer, status)
  },

  // GET ONE
  getOneCfdi: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await Cfdi.getOne(id)
    response(req, res, 'GET ONE CFDI', queryAnswer, status)
  },

  // POST ONE
  postOneCfdi: async (req, res) => {
    const cfdi = { ...req.body }
    const [queryAnswer, status] = await Cfdi.postOne(cfdi)
    response(req, res, 'POST ONE cfdi', queryAnswer, status)
  },

  // UPDATE ONE
  updateOneCfdi: async (req, res) => {
    const cfdi = req.body
    const id = req.params.id
    const [queryAnswer, status] = await Cfdi.putOne(cfdi, id)
    response(req, res, 'UPDATE ONE CFDI', queryAnswer, status)
  },

  // DELETE ONE
  deleteOneCfdi: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await Cfdi.deleteOne(id)
    response(req, res, 'DELETE ONE CFDI', queryAnswer, status)
  }
}
