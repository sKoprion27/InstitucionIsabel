import { response } from './../utils/response'
import { Beneficiary } from './../models/Beneficiary.model'
import path from 'path'
import fs from 'fs'

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

  getFile: async (req, res) => {
    try {
      const { id } = req.params
      const { rows } = await Beneficiary.getOne(id)
      // File
      const fileName = rows[0].archivo
      const filePath = path.join(__dirname, '/../../uploads/', fileName)

      // console.log(exist)

      if (fs.existsSync(filePath)) {
        res.contentType(`application/${path.extname(fileName)}`)
        res.status(201).download(
          filePath,
          fileName
        )
      } else {
        response(req, res, 'ERROR GET FILE', null, 500)
      }
    } catch (error) {
      console.log(error, 'get file')
      response(req, res, 'ERROR GET FILE', null, 500)
    }
  },

  // POST ONE
  postOneBeneficiary: async (req, res) => {
    try {
      const beneficiary = JSON.parse(req.body.beneficiary)
      const postBeneficiary = {
        ...beneficiary,
        archivo: `${req.file.filename}`
      }
      console.log(postBeneficiary, 'POST')
      const { rowCount } = await Beneficiary.postOne(postBeneficiary)
      response(req, res, 'POST ONE BENEFICIARY', rowCount, 201)
    } catch (error) {
      console.log(error)
      response(req, res, 'ERROR POST ONE BENEFICIARY', null, 500)
    }
  },

  // UPDATE ONE
  updateOneBeneficiary: async (req, res) => {
    try {
      const { id } = req.params
      const beneficiary = JSON.parse(req.body.beneficiary)
      const currentFile = await Beneficiary.getOne(id)
      const filePath = path.join(
        __dirname, '/../../uploads/',
        (currentFile.rows[0].archivo ? currentFile.rows[0].archivo : 'NULL')
      )

      console.log(req.file)
      const postBeneficiary = {
        ...beneficiary,
        archivo: req.file ? req.file.filename : currentFile.rows[0].archivo
      }
      const { rowCount } = await Beneficiary.putOne(postBeneficiary, id)
      if (rowCount === 0) {
        response(req, res, 'UPDATE ONE BENEFICIARY', null, 500)
        return
      }
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
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
