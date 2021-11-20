import { response } from './../utils/response'
import { Donor } from './../models/Donor.model'
import { State } from '../models/State.model'
import { Cfdi } from '../models/Cfdi.model'

export const donorController = {
  getDonors: async (req, res) => {
    try {
      const { limit, offset } = req.query
      if (limit && offset) {
        const { rowCount } = await Donor.getAll()
        const { rows } = await Donor.pagination(limit, offset)
        response(req, res, 'GET DONORS', {
          donors: rows,
          total: rowCount
        }, 200)
      } else {
        const { rows, rowCount } = await Donor.getAll()
        response(req, res, 'GET DONORS', {
          donors: rows,
          total: rowCount
        }, 200)
      }
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET DONORS', null, 500)
    }
  },

  getOneDonor: async (req, res) => {
    const { id } = req.params
    try {
      const donor = await Donor.getOne(id)

      const states = await State.getAll()
      const cfdis = await Cfdi.getAll()

      if (donor.rowCount === 0) {
        response(req, res, 'ERROR GET ONE DONOR 🐹', null, 500)
        return
      }
      // {}
      const getDonor = {
        donor: { ...donor.rows[0] }, // {}
        estados: states.rows, // []
        cfdis: cfdis.rows // []
      }
      response(req, res, 'GET ONE DONOR', getDonor, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET ONE DONOR 👻', null, 500)
    }
  },
  postOneDonor: async (req, res) => {
    try {
      const { donor } = req.body
      console.log(req.body, ' soy el donor')
      const donorResponse = await Donor.postOne(donor)

      if (donorResponse.rowCount === 0) {
        response(req, res, 'ERROR POST ONE DONOR', null, 500)
        return
      }

      response(req, res, 'POST ONE DONATION', donorResponse.rowCount, 201)
    } catch (error) {
      console.log(error, '🤡')
      response(req, res, 'ERROR POST ONE DONOR', null, 500)
    }
  },
  updateOneDonor: async (req, res) => {
    try {
      const donor = req.body
      const id = req.params.id
      const { rows, rowCount } = await Donor.putOne(donor, id)
      console.log(rows)
      response(req, res, 'UPDATE ONE DONOR', rowCount, 201)
    } catch (error) {
      console.log(error, ':grinning:')
      response(req, res, 'UPDATE ONE DONOR', null, 500)
    }
  },
  deleteOneDonor: async (req, res) => {
    try {
      const id = req.params.id
      const { rowCount } = await Donor.deleteOne(id)

      if (rowCount === 0) {
        response(req, res, 'ERROR DELETE ONE DONOR', null, 500)
        return
      }
      response(req, res, 'DELETE ONE DONOR', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR DELETE ONE DONOR', null, 500)
    }
  }
}
