import { Router } from 'express'
import { getTypesDonations, getOneTypesDonations } from '../controllers/typesDonations.controller'

const router = Router()

router.get('/', getTypesDonations)
router.get('/:id', getOneTypesDonations)

export default router
