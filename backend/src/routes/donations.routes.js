import { Router } from 'express'
import { multerUploadImage } from '../lib/multer'
import { donationMiddleware } from '../middlewares/donations.middleware'
import { donationController } from './../controllers/donations.controller'

const router = Router()

router.get('/', donationController.getDonations)
router.get('/:id', donationController.getOneDonation)
router.post('/', multerUploadImage,
  donationMiddleware.addImageBody,
  donationController.postOneDonation
)
router.put('/:id', donationController.updateOneDonation)
router.delete('/:id', donationController.deleteOneDonation)

export default router
