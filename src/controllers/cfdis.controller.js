import { response } from './../utils/response'
import { Cfdi } from './../models/Cfdi.model'

export const cfdiController = {

  // GET ALL
  getCfdis: async (req, res) => {
    try {
      const { rows } = await Cfdi.getAll()
      response(req, res, 'GET CFDIs', rows, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET CFDIs', null, 500)
    }
  },

  // GET ONE
  getOneCfdi: async (req, res) => {
    const { id } = req.params
    try {
      const { rows, rowCount } = await Cfdi.getOne(id)
      if (rowCount === 0) {
        response(req, res, 'ERROR GET CFDI', null, 500)
        return
      }
      response(req, res, 'GET CFDI', rows[0], 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET CFDI', null, 500)
    }
  },

  // POST ONE
  postOneCfdi: async (req, res) => {
    try {
      const cfdi = { ...req.body }
      const { rowCount } = await Cfdi.postOne(cfdi)
      response(req, res, 'POST ONE CFDI', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE CFDI', null, 500)
    }
  },

  // UPDATE ONE
  updateOneCfdi: async (req, res) => {
    try {
      const cfdi = req.body
      const id = req.params.id
      const { rowCount } = await Cfdi.putOne(cfdi, id)
      response(req, res, 'UPDATE ONE CFDI', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR UPDATE ONE CFDI', null, 500)
    }
  },

  // DELETE ONE
  deleteOneCfdi: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await Cfdi.deleteOne(id)
      response(req, res, 'DELETE ONE CFDI', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE CFDI', null, 500)
    }
  }
}
