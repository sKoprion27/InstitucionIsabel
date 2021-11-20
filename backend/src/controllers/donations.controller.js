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
import { cloudinaryAdmin, getPublicId } from '../lib/cloudinary'

export const donationController = {
  // GET ALL
  getDonations: async (req, res) => {
    try {
      const { startDate, endDate, limit, offset } = req.query
      if (startDate && endDate) {
        const { rows, rowCount } = await Donation
          .getAllByRange(startDate, endDate)

        response(req, res, 'GET DONATIONS', {
          donations: rows,
          total: rowCount
        }, 200)
      } else if (limit && offset) {
        const { rows, rowCount } = await Donation.pagination(limit, offset)
        response(req, res, 'GET DONATIONS', {
          donations: rows,
          total: rowCount
        }, 200)
      } else {
        const { rows, rowCount } = await Donation.getAll()
        response(req, res, 'GET DONATIONS', {
          donations: rows,
          total: rowCount
        }, 200)
      }
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
      const { donation } = req.body

      const donationResponse = await Donation.postOne(donation)
      const donationCreated = donationResponse.rows[0]

      if (donationResponse.rowCount === 0) {
        response(req, res, 'ERROR POST ONE DONATION', null, 500)
        return
      }

      const { categories } = donation

      for (const category of categories) {
        const categoryResponse = await DonationCategory
          .postOne(donationCreated.id, category.id)

        if (categoryResponse.rowCount === 0) {
          response(req, res, 'ERROR POST ONE DONATION', null, 500)
          return
        }
      }

      const { beneficiaries } = donation
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
      console.log(error, '🤡')
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
      const { categories } = donation
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
        for (let index = 0; index < donationCategories.rows.length; index++) {
          await DonationCategory
            .deleteOne(id, donationCategories.rows[index].id)
        }
        for (let index = 0; index < categories.length; index++) {
          await DonationCategory.postOne(id, categories[index].id)
        }
      }
      // Compare data beneficiaries
      const { beneficiaries } = donation
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
        for (let index = 0; index < donationBeneficiaries.rows.length; index++) {
          await DonationBeneficiary
            .deleteOne(id, donationBeneficiaries.rows[index].id)
        }
        for (let index = 0; index < beneficiaries.length; index++) {
          await DonationBeneficiary.postOne(id, beneficiaries[index].id)
        }
      }

      response(req, res, 'UPDATE ONE DONATION', '', 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR UPDATE ONE DONATION', null, 500)
    }
  },
  updateOneDonationInvoce: async (req, res) => {
    try {
      const { esta_facturado } = req.body
      console.log(esta_facturado, 'UP INVOICE')
      const { id } = req.params
      const { rowCount } = await Donation.updateOneDonationInvoce(id, esta_facturado)
      if (rowCount === 0) {
        response(req, res, 'ERROR INVOICE ONE DONATION', null, 500)
        return
      }
      response(req, res, 'SUCCESS INVOICE ONE DONATION', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR INVOICE ONE DONATION', null, 500)
    }
  },
  // DELETE ONE
  deleteOneDonation: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await Donation.deleteOne(id)

      if (rowCount === 0) {
        response(req, res, 'ERROR DELETE ONE DONATION', null, 500)
        return
      }
      response(req, res, 'DELETE ONE DONATION', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE DONATION', null, 500)
    }
  },

  // DELETE PHOTO DONATION
  deletePhotos: async (req, res) => {
    console.log('DELETE PHOTO')
    try {
      const { id } = req.params
      const { rows } = await Donation.getOne(id)
      const urlImageDelete = rows[0].foto_donacion
      if (urlImageDelete) {
        const publicId = getPublicId(urlImageDelete)
        await cloudinaryAdmin.delete_resources(publicId)
      }
      const { rowCount } = await Donation.updatePhoto(id, null)
      if (rowCount === 1) {
        response(req, res, 'DELETE PHOTO DONATION', rowCount, 201)
        return
      }
      response(req, res, 'ERROR DELETE PHOTO', null, 500)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE DONATION', null, 500)
    }
  }
}
