import { response } from './../utils/response'
import { Donation } from './../models/Donation.model'
import { PaymentMethod } from '../models/PaymentMethod.model'
import { TypesDonation } from '../models/TypesDonations.model'
import { Donor } from '../models/Donor.model'
import { Beneficiary } from '../models/Beneficiary.model'
import { Category } from '../models/Category.model'
import { DonationBeneficiary } from '../models/DonationBeneficiary'
import { arrayDiference } from '../utils'
import { DonationCategory } from '../models/DonationCategory'

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
      console.log('POST DONATION 😀', req.body)
      const { donation } = req.body
      const donationResponse = await Donation.postOne(donation)
      const donationCreated = donationResponse.rows[0]

      if (donationResponse.rowCount === 0) {
        response(req, res, 'ERROR POST ONE DONATION', null, 500)
        return
      }

      const { categories } = req.body

      for (const category of categories) {
        const categoryResponse = await DonationCategory
          .postOne(donationCreated.id, category.id)

        if (categoryResponse.rowCount === 0) {
          response(req, res, 'ERROR POST ONE DONATION', null, 500)
          return
        }
      }

      const { beneficiaries } = req.body
      for (const beneficiary of beneficiaries) {
        const beneficiaryResponse = await DonationBeneficiary
          .postOne(donationCreated.id, beneficiary.id)
        if (beneficiaryResponse.rowCount === 0) {
          response(req, res, 'ERROR POST ONE DONATION', null, 500)
          return
        }
      }

      response(req, res, 'POST ONE DONATION', donationResponse.rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE DONATION', null, 500)
    }
  },

  // UPDATE ONE
  updateOneDonation: async (req, res) => {
    try {
      // New data
      console.log('CONTROLLER PUT')
      const { id } = req.params
      const { donation } = req.body
      // Insert data donation
      const donationInsert = await Donation.putOne(donation, id)
      if (donationInsert.rowCount === 0) {
        console.log('ERR')
        response(req, res, 'ERROR UPDATE ONE DONATION', null, 500)
        return
      }
      // Compare data categories
      const { categories } = req.body
      // Current data
      const donationCategories = await Donation.getCategories(id)
      if (donationCategories.rows.length > categories.length) {
        console.log('CURRENT CATEGORIES THAN __ DELETE')
        const categoriesDelete = arrayDiference(
          donationCategories.rows,
          categories,
          'id'
        )
        // console.log('categoriesDelete', categoriesDelete)
        for (const category of categoriesDelete) {
          await DonationCategory.deleteOne(id, category.id)
        }
      } else if (categories.length > donationCategories.rows.length) {
        // console.log('NEW CATEGORIES THAN __ UPDATE')
        const categoriesUpdate = arrayDiference(
          categories,
          donationCategories.rows,
          'id'
        )
        // console.log('categoriesUpdate', categoriesUpdate)
        for (const category of categoriesUpdate) {
          await DonationCategory.postOne(id, category.id)
        }
      } else {
        console.log('NO DIFF CATEGORIES')
      }
      // Compare data beneficiaries
      const { beneficiaries } = req.body
      const donationBeneficiaries = await Donation.getBeneficiaries(id)

      if (donationBeneficiaries.rows.length > beneficiaries.length) {
        console.log('CURRENT beneficiaries THAN __ DELETE')
        const beneficiaryDelete = arrayDiference(
          donationBeneficiaries.rows,
          beneficiaries,
          'id'
        )
        for (const beneficiary of beneficiaryDelete) {
          await DonationBeneficiary.deleteOne(id, beneficiary.id)
        }
      } else if (beneficiaries.length > donationBeneficiaries.rows.length) {
        console.log('NEW beneficiaries THAN __ UPDATE')

        const beneficiariesUpdate = arrayDiference(
          beneficiaries,
          donationBeneficiaries.rows,
          'id'
        )
        console.log(beneficiariesUpdate)
        for (const beneficiary of beneficiariesUpdate) {
          await DonationBeneficiary.postOne(id, beneficiary.id)
        }
      } else {
        console.log('NO DIFF beneficiaries')
      }

      response(req, res, 'UPDATE ONE DONATION', '', 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR UPDATE ONE DONATION', null, 500)
    }
  },

  // DELETE ONE
  deleteOneDonation: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await Donation.deleteOne(id)

      if (rowCount === 0) {
        response(req, res, 'ERROR DELETE ONE USER', null, 500)
        return
      }
      response(req, res, 'DELETE ONE USER', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE USER', null, 500)
    }
  }
}
