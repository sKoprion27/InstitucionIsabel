import { response } from './../utils/response'
import { Donation } from './../models/Donation.model'
import { PaymentMethod } from '../models/PaymentMethod.model'
import { TypesDonation } from '../models/TypesDonations.model'
import { Donor } from '../models/Donor.model'
import { Beneficiary } from '../models/Beneficiary.model'
import { Category } from '../models/Category.model'

export const donationController = {
  // GET ALL
  getDonations: async (req, res) => {
    try {
      const { rows } = await Donation.getAll()
      response(req, res, 'GET DONATIONS', rows, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET DONATIONS', null, 500)
    }
  },

  // GET ONE
  getOneDonation: async (req, res) => {
    const { id } = req.params
    try {
      const donation = await Donation.getOne(id)
      const donationCategories = await Donation.getCategories(id)
      const donationBeneficiaries = await Donation.getBeneficiaries(id)

      const paymentMethods = await PaymentMethod.getAll()
      const typesDonations = await TypesDonation.getAll()
      const donors = await Donor.getAll()
      const beneficiaries = await Beneficiary.getAll()
      const categories = await Category.getAll()

      if (donation.rowCount === 0) {
        response(req, res, 'ERROR GET ONE DONATION', null, 500)
        return
      }
      // {}
      const getDonation = {
        donation: {
          ...donation.rows[0],
          categorias: donationCategories.rows,
          beneficiarios: donationBeneficiaries.rows
        }, // {}
        metodos_pago: paymentMethods.rows, // []
        tipos_donacion: typesDonations.rows, // []
        donadores: donors.rows,
        categorias: categories.rows,
        beneficiarios: beneficiaries.rows
      }
      response(req, res, 'GET ONE DONATION', getDonation, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET ONE DONATION', null, 500)
    }
  },

  // POST ONE
  postOneDonation: async (req, res) => {
    try {
      const donor = { ...req.body }
      const { rowCount } = await Donation.postOne(donor)
      response(req, res, 'POST ONE DONATION', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'POST ONE DONATION', null, 500)
    }
  },

  // UPDATE ONE
  updateOneDonation: async (req, res) => {
    try {
      const donor = req.body
      const id = req.params.id
      const { rowCount } = await Donation.putOne(donor, id)
      if (rowCount === 0) {
        response(req, res, 'ERROR UPDATE ONE DONATION', null, 500)
        return
      }
      response(req, res, 'UPDATE ONE DONATION', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR UPDATE ONE DONATION', null, 500)
    }
  },

  // DELETE ONE
  deleteOneDonation: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await Donation.deleteOne(id)
    response(req, res, 'DELETE ONE USER', queryAnswer, status)
  }
}
