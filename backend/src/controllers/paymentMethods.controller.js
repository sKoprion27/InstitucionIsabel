import { response } from './../utils/response'
import { PaymentMethod } from './../models/PaymentMethod.model'

export const paymentMethodController = {
  // GET ALL
  getPaymentMethods: async (req, res) => {
    const [queryAnswer, status] = await PaymentMethod.getAll()
    response(req, res, 'GET PAYMENT METHODS', queryAnswer, status)
  },

  // GET ONE
  getOnePaymentMethod: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await PaymentMethod.getOne(id)
    response(req, res, 'GET ONE PAYMENT METHOD', queryAnswer, status)
  },

  // POST ONE
  postOnePaymentMethod: async (req, res) => {
    const paymentMethod = { ...req.body }
    const [queryAnswer, status] = await PaymentMethod.postOne(paymentMethod)
    response(req, res, 'POST ONE PAYMENT METHOD', queryAnswer, status)
  },

  // UPDATE ONE
  updateOnePaymentMethod: async (req, res) => {
    const paymentMethod = req.body
    const id = req.params.id
    const [queryAnswer, status] = await PaymentMethod.putOne(paymentMethod, id)
    response(req, res, 'UPDATE ONE PAYMENT METHOD', queryAnswer, status)
  },

  // DELETE ONE
  deleteOnePaymentMethod: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await PaymentMethod.deleteOne(id)
    response(req, res, 'DELETE ONE BENIFICIARY', queryAnswer, status)
  }
}
