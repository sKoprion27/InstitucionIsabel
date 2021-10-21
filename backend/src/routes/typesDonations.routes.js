import { Router } from 'express'
import { typesDonationController } from '../controllers/typesDonations.controller'
import { validateTypeDonations } from '../middlewares/TypesDonations.schema'
const router = Router()

router.get('/', typesDonationController.getTypesDonations)
router.get('/:id', typesDonationController.getOneTypesDonation)
router.post('/', validateTypeDonations, typesDonationController.postOneTypesDonation)
router.put('/:id', typesDonationController.updateOneTypesDonation)
router.delete('/:id', typesDonationController.deleteOneTypesDonation)

export default router
