import { response } from './../utils/response'
import { PaymentMethod } from './../models/PaymentMethod.model'

export const paymentMethodController = {
  // GET ALL
  getPaymentMethods: async (req, res) => {
    try {
      const { rows } = await PaymentMethod.getAll()
      response(req, res, 'GET PAYMENT METHODS', rows, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET PAYMENT METHODS', null, 500)
    }
  },

  // GET ONE
  getOnePaymentMethod: async (req, res) => {
    try {
      const { id } = req.params
      const { rows, rowCount } = await PaymentMethod.getOne(id)
      if (rowCount === 0) {
        response(req, res, 'ERROR GET ONE PAYMENT METHOD', null, 500)
        return
      }
      response(req, res, 'GET ONE PAYMENT METHOD', rows[0], 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET ONE PAYMENT METHOD', null, 500)
    }
  },

  // POST ONE
  postOnePaymentMethod: async (req, res) => {
    try {
      const paymentMethod = { ...req.body }
      const { rowCount } = await PaymentMethod.postOne(paymentMethod)
      response(req, res, 'POST ONE PAYMENT METHOD', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE PAYMENT METHOD', null, 500)
    }
  },

  // UPDATE ONE
  updateOnePaymentMethod: async (req, res) => {
    try {
      const paymentMethod = req.body
      const id = req.params.id
      const { rowCount } = await PaymentMethod.putOne(paymentMethod, id)
      response(req, res, 'UPDATE ONE PAYMENT METHOD', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'UPDATE ONE PAYMENT METHOD', null, 500)
    }
  },
  // DELETE ONE
  deleteOnePaymentMethod: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await PaymentMethod.deleteOne(id)
      response(req, res, 'DELETE ONE BENIFICIARY', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE BENIFICIARY', null, 500)
    }
  }
}
