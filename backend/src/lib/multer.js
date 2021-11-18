import multer from 'multer'
import path from 'path'
const DatauriParser = require('datauri/parser')

const memoryStorage = multer.memoryStorage()
const multerUploadImage = multer({ storage: memoryStorage }).single('foto_donacion')
/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const dataUri = (req) => {
  const parser = new DatauriParser()
  return parser.format(path.extname(req.file.originalname).toString(), req.file.buffer).content
}

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file) {
      cb(null, 'uploads/')
    }
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, Date.now() + path.extname(file.originalname))
    } // Appending extension
  }
})
const multerUploadFile = multer({ storage: diskStorage })
export { multerUploadImage, multerUploadFile, dataUri }
