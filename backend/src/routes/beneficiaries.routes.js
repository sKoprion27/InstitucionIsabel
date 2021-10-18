import { Router } from 'express'
import { getBeneficiaries, getOneBeneficiary, postOneBeneficiary, updateOneBeneficiary, deleteOneBeneficiary } from './../controllers/beneficiaries.controller'

const router = Router()

router.get('/', getBeneficiaries)
router.get('/:id', getOneBeneficiary)
router.post('/', postOneBeneficiary)
router.put('/:id', updateOneBeneficiary)
router.delete('/:id', deleteOneBeneficiary)

export default router
