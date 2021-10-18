import { response } from './../utils/response'
import { Beneficiary } from './../models/Beneficiary.model'

// GET ALL
export const getBeneficiaries = async (req, res) => {
  const beneficiaries = await Beneficiary.getAll()
  response(req, res, 'GET Beneficiaries', beneficiaries, 200)
}

// GET ONE
export const getOneBeneficiary = async (req, res) => {
  const { id } = req.params
  const beneficiary = await Donor.getOne(id)
  response(req, res, 'GET ONE Beneficiary', beneficiary, 200)
}

// POST ONE
export const postOneBeneficiary = async (req, res) => {
  const beneficiary = {
    ...req.body
  }
  const queryAnswer = await Beneficiary.postOne(beneficiary)
  response(req, res, 'POST ONE BENEFICIARY', queryAnswer, 201)
}

// UPDATE ONE
export const updateOneBeneficiary = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'UPDATE this beneficiary: ' + id + ' ✏️' })
}

// DELETE ONE
export const deleteOneBeneficiary = (req, res) => {
  const { id } = req.params
  res.status(201).json({ message: 'DELETE this beneficiary: ' + id + ' 😢' })
}
