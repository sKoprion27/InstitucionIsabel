import { Router } from 'express'
import { getTypesDonations, getOneTypesDonation, postOneTypesDonation } from '../controllers/typesDonations.controller'
import { validateTypeDonations } from '../middlewares/TypesDonations.schema'
const router = Router()

router.get('/', getTypesDonations)
router.get('/:id', getOneTypesDonation)
router.post('/', validateTypeDonations, postOneTypesDonation)

export default router
