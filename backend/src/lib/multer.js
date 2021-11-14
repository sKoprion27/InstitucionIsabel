import multer from 'multer'
import path from 'path'
const DatauriParser = require('datauri/parser')

const storage = multer.memoryStorage()
const multerUploadImage = multer({ storage: storage }).single('foto_donacion')

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const dataUri = (req) => {
  const parser = new DatauriParser()
  return parser.format(path.extname(req.file.originalname).toString(), req.file.buffer).content
}
export { multerUploadImage, dataUri }
