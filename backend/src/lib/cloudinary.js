import globalConfig from '../config'
const cloudinary = require('cloudinary').v2

export const cloudinaryConfig = (req, res, next) => {
  cloudinary.config(globalConfig.cloudinay)
  next()
}
export const cloudinaryUploader = cloudinary.uploader
export const cloudinaryAdmin = cloudinary.api

export const getPublicId = (url) => {
  const arr = url.split('/')
  const path = `${arr[arr.length - 2]}/${arr[arr.length - 1].split('.')[0]}`
  return path
}
