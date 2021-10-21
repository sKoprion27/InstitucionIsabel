import { Router } from 'express'
import { beneficiaryController } from './../controllers/beneficiaries.controller'

const router = Router()

router.get('/', beneficiaryController.getBeneficiaries)
router.get('/:id', beneficiaryController.getOneBeneficiary)
router.post('/', beneficiaryController.postOneBeneficiary)
router.put('/:id', beneficiaryController.updateOneBeneficiary)
router.delete('/:id', beneficiaryController.deleteOneBeneficiary)

export default router
