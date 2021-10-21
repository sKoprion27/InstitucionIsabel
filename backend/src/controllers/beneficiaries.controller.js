import { response } from './../utils/response'
import { Beneficiary } from './../models/Beneficiary.model'

export const beneficiaryController = {
  // GET ALL
  getBeneficiaries: async (req, res) => {
    const [queryAnswer, status] = await Beneficiary.getAll()
    response(req, res, 'GET BENEFICIARIES', queryAnswer, status)
  },

  // GET ONE
  getOneBeneficiary: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await Beneficiary.getOne(id)
    response(req, res, 'GET ONE BENEFICIARY', queryAnswer, status)
  },

  // POST ONE
  postOneBeneficiary: async (req, res) => {
    const donor = { ...req.body }
    const [queryAnswer, status] = await Beneficiary.postOne(donor)
    response(req, res, 'POST ONE BENEFICIARY', queryAnswer, status)
  },

  // UPDATE ONE
  updateOneBeneficiary: async (req, res) => {
    const beneficiary = req.body
    const id = req.params.id
    const [queryAnswer, status] = await Beneficiary.putOne(beneficiary, id)
    response(req, res, 'UPDATE ONE BENEFICIARY', queryAnswer, status)
  },

  // DELETE ONE
  deleteOneBeneficiary: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await Beneficiary.deleteOne(id)
    response(req, res, 'DELETE ONE BENIFICIARY', queryAnswer, status)
  }
}
