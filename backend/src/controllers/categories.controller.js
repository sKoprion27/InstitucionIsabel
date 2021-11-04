import { response } from './../utils/response'
import { Category } from './../models/Category.model'

export const categoryController = {
  // GET ALL
  getAll: async (req, res) => {
    try {
      const { rows } = await Category.getAll()
      response(req, res, 'GET CATEGORIES', rows, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET CATEGORIES', null, 500)
    }
  },

  // GET ONE
  getOne: async (req, res) => {
    try {
      const { id } = req.params
      const { rows, rowCount } = await Category.getOne(id)
      if (rowCount === 0) {
        response(req, res, 'ERROR GET ONE Category', null, 500)
        return
      }
      response(req, res, 'GET ONE Category', rows[0], 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET ONE Category', null, 500)
    }
  },

  // POST ONE
  postOne: async (req, res) => {
    try {
      const category = { ...req.body }
      const { rowCount } = await Category.postOne(category)
      response(req, res, 'POST ONE Category', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE Category', null, 500)
    }
  },

  // UPDATE ONE
  updateOne: async (req, res) => {
    try {
      const category = req.body
      const id = req.params.id
      const { rowCount } = await Category.putOne(category, id)
      response(req, res, 'UPDATE ONE Category', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR UPDATE ONE Category', null, 500)
    }
  },

  // DELETE ONE
  deleteOne: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await Category.deleteOne(id)
      response(req, res, 'DELETE ONE BENIFICIARY', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE BENIFICIARY', null, 500)
    }
  }
}
