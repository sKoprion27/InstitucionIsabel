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
    const { id } = req.params
    const [queryAnswer, status] = await Category.getOne(id)
    response(req, res, 'GET ONE Category', queryAnswer, status)
  },

  // POST ONE
  postOne: async (req, res) => {
    const Category = { ...req.body }
    const [queryAnswer, status] = await Category.postOne(Category)
    response(req, res, 'POST ONE Category', queryAnswer, status)
  },

  // UPDATE ONE
  updateOne: async (req, res) => {
    const Category = req.body
    const id = req.params.id
    const [queryAnswer, status] = await Category.putOne(Category, id)
    response(req, res, 'UPDATE ONE Category', queryAnswer, status)
  },

  // DELETE ONE
  deleteOne: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await Category.deleteOne(id)
    response(req, res, 'DELETE ONE BENIFICIARY', queryAnswer, status)
  }
}
