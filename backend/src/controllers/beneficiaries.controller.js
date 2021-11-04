import { response } from './../utils/response'
import { Beneficiary } from './../models/Beneficiary.model'

export const beneficiaryController = {
  // GET ALL
  getBeneficiaries: async (req, res) => {
    try {
      const { rows } = await Beneficiary.getAll()
      response(req, res, 'GET BENEFICIARIES', rows, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET BENEFICIARIES', null, 500)
    }
  },

  // GET ONE
  getOneBeneficiary: async (req, res) => {
    const { id } = req.params
    try {
      const { rows, rowCount } = await Beneficiary.getOne(id)
      if (rowCount === 0) {
        response(req, res, 'ERROR GET BENEFICIARIES', null, 500)
        return
      }
      response(req, res, 'GET BENEFICIARIES', rows[0], 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET BENEFICIARIES', null, 500)
    }
  },

  // POST ONE
  postOneBeneficiary: async (req, res) => {
    try {
      const beneficiary = { ...req.body }
      const { rowCount } = await Beneficiary.postOne(beneficiary)
      response(req, res, 'POST ONE BENEFICIARY', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE BENEFICIARY', null, 500)
    }
  },

  // UPDATE ONE
  updateOneBeneficiary: async (req, res) => {
    try {
      const beneficiary = req.body
      const id = req.params.id
      const { rowCount } = await Beneficiary.putOne(beneficiary, id)
      response(req, res, 'UPDATE ONE BENEFICIARY', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR UPDATE ONE BENEFICIARY', null, 500)
    }
  },

  // DELETE ONE
  deleteOneBeneficiary: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await Beneficiary.deleteOne(id)
      response(req, res, 'DELETE ONE BENIFICIARY', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE BENIFICIARY', null, 500)
    }
  }
}
