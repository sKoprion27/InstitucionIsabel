import { Router } from 'express'
import { multerUploadFile } from '../lib/multer'
import { beneficiaryController } from './../controllers/beneficiaries.controller'

const router = Router()

router.get('/', beneficiaryController.getBeneficiaries)
router.get('/:id', beneficiaryController.getOneBeneficiary)
router.get('/:id/files', beneficiaryController.getFile)
router.post('/',
  multerUploadFile.single('archivo'),
  beneficiaryController.postOneBeneficiary
)
router.put('/:id',
  multerUploadFile.single('archivo'),
  beneficiaryController.updateOneBeneficiary)
router.delete('/:id', beneficiaryController.deleteOneBeneficiary)

export default router
