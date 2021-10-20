import { Router } from 'express'
import { donationController } from './../controllers/donations.controller'

const router = Router()

router.get('/', donationController.getDonations)
router.get('/:id', donationController.getOneDonation)
router.post('/', donationController.postOneDonation)
router.put('/:id', donationController.updateOneDonation)
router.delete('/:id', donationController.deleteOneDonation)

export default router
