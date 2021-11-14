import globalConfig from '../config'
const cloudinary = require('cloudinary').v2

export const cloudinaryConfig = (req, res, next) => {
  cloudinary.config(globalConfig.cloudinay)
  next()
}
export const cloudinaryUploader = cloudinary.uploader
