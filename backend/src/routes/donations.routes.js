import { Router } from 'express'
import { deleteOneDonation, getOneDonation, getDonation, postOneDonation, updateOneDonation } from './../controllers/donations.controller'

const router = Router()

router.get('/', getDonation)
router.get('/:id', getOneDonation)
router.post('/', postOneDonation)
router.put('/:id', updateOneDonation)
router.delete('/:id', deleteOneDonation)

export default router
