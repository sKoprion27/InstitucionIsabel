import { response } from './../utils/response'
import { Donor } from './../models/Donor.model'
import { State } from '../models/State.model'
import { Cfdi } from '../models/Cfdi.model'

export const donorController = {
  getDonors: async (req, res) => {
    try {
      const { rows } = await Donor.getAll()
      response(req, res, 'GET DONORS', rows, 200)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR GET DONORS', null, 500)
    }
  },

  getOneDonor: async (req, res) => {
    const { id } = req.params
    try {
      const donor = await Donor.getOne(id)
      const donorState = await Donor.getStates(id)
      const donorCfdi = await Donor.getCfdis(id)

      const states = await State.getAll()
      const cfdis = await Cfdi.getAll()

      if (donor.rowCount === 0) {
        response(req, res, 'ERROR GET ONE DONOR 🐹', null, 500)
        return
      }
      // {}
      const getDonor = {
        donor: {
          ...donor.rows[0],
          estados: donorState.rows,
          cfdis: donorCfdi.rows
        }, // {}
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
      console.log(donor)
      const donorResponse = await Donor.postOne(donor)
      const donorCreated = donorResponse.rows[0]

      if (donorResponse.rowCount === 0) {
        response(req, res, 'ERROR POST ONE DONOR', null, 500)
        return
      }

      const { states } = donor
      for (const state of states) {
        const stateResponse = await State
          .postOne(donorCreated.id, state.id)
        if (stateResponse.rowCount === 0) {
          response(req, res, 'ERROR POST ONE DONOR', null, 500)
          return
        }
      }

      const { cfdis } = donor
      for (const cfdi of cfdis) {
        const cfdiResponse = await Cfdi
          .postOne(donorCreated.id, cfdi.id)
        if (cfdiResponse.rowCount === 0) {
          response(req, res, 'ERROR POST ONE DONOR', null, 500)
          return
        }
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
