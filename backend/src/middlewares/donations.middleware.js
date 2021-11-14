import { cloudinaryUploader } from '../lib/cloudinary'
import { dataUri } from '../lib/multer'

export const donationMiddleware = {
  addImageBody: async (req, res, next) => {
    console.log('POST FILE 😀', req.file)
    console.log('POST DONATION 😀', JSON.parse(req.body.donation))
    const donation = JSON.parse(req.body.donation)
    if (req.file) {
      const image = dataUri(req)
      const response = await cloudinaryUploader.upload(image, { folder: 'donations' })
      const url_donacion = response.secure_url
      const donationWithImage = {
        ...donation,
        foto_donacion: url_donacion
      }
      req.body.donation = donationWithImage
    } else {
      req.body.donation = { ...donation }
    }
    next()
  }
}
