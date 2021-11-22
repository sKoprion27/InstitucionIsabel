import { Router } from 'express'
import { typesDonationController } from '../controllers/typesDonations.controller'
const router = Router()

router.get('/', typesDonationController.getTypesDonations)
router.get('/:id', typesDonationController.getOneTypesDonation)
router.post('/',
  typesDonationController.postOneTypesDonation
)
router.put('/:id',
  typesDonationController.updateOneTypesDonation
)
router.delete('/:id',
  typesDonationController.deleteOneTypesDonation
)

export default router
