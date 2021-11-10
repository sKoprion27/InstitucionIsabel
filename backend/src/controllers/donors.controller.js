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

  /* getOneDonor: async (req, res) => {
    const { id } = req.params
    const [queryAnswer, status] = await Donor.getOne(id)
    response(req, res, 'GET ONE DONOR', queryAnswer, status)
  }, */
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
    const donor = { ...req.body }
    const [queryAnswer, status] = await Donor.postOne(donor)
    response(req, res, 'POST ONE DONOR', queryAnswer, status)
  },
  updateOneDonor: async (req, res) => {
    const donor = req.body
    const id = req.params.id
    const [queryAnswer, status] = await Donor.putOne(donor, id)
    response(req, res, 'UPDATE ONE DONOR', queryAnswer, status)
  },
  deleteOneDonor: async (req, res) => {
    const id = req.params.id
    const [queryAnswer, status] = await Donor.deleteOne(id)
    response(req, res, 'DELETE ONE USER', queryAnswer, status)
  }
}
