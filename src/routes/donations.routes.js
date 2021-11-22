import { Router } from 'express'
import { multerUploadImage } from '../lib/multer'
import { donationMiddleware } from '../middlewares/donations.middleware'
import { donationController } from './../controllers/donations.controller'

const router = Router()

router.get('/?', donationController.getDonations)
router.get('/:id', donationController.getOneDonation)
router.post('/', multerUploadImage,
  donationMiddleware.addImageBody,
  donationController.postOneDonation
)
router.put('/:id',
  multerUploadImage,
  donationMiddleware.addImageBody,
  donationController.updateOneDonation)
router.put('/:id/invoices', donationController.updateOneDonationInvoce)
router.delete('/:id', donationController.deleteOneDonation)
router.delete('/:id/photos', donationController.deletePhotos)

export default router
