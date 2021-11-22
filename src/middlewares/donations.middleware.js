import { cloudinaryAdmin, cloudinaryUploader, getPublicId } from '../lib/cloudinary'
import { dataUri } from '../lib/multer'
import { Donation } from '../models/Donation.model'
import { response } from '../utils/response'

export const donationMiddleware = {
  addImageBody: async (req, res, next) => {
    try {
      const { id } = req.params
      const donation = JSON.parse(req.body.donation)

      console.log(req.file)
      if (req.file) {
        const image = dataUri(req)
        const response = await cloudinaryUploader.upload(image, { folder: 'donations' })
        console.log(response)
        const url_donacion = response.secure_url
        const donationWithImage = {
          ...donation,
          foto_donacion: url_donacion
        }
        req.body.donation = donationWithImage

        if (id) {
          const { rows } = await Donation.getOne(id)
          const urlImageDelete = rows[0].foto_donacion
          if (urlImageDelete) {
            const publicId = getPublicId(urlImageDelete)
            const response = await cloudinaryAdmin.delete_resources(publicId)
            console.log(response)
          }
        }
      } else {
        const { rows } = await Donation.getOne(id)
        req.body.donation = { ...rows[0], ...donation }
      }
      next()
    } catch (error) {
      console.log(error)
      response(req, res, 'Error post donation', null, 500)
    }
  }
}
