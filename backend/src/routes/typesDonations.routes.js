import { Router } from 'express'
import { getTypesDonations, getOneTypesDonation, postOneTypesDonation } from '../controllers/typesDonations.controller'

const router = Router()

router.get('/', getTypesDonations)
router.get('/:id', getOneTypesDonation)
router.post('/', postOneTypesDonation)

export default router
