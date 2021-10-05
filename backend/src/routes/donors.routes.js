import { Router } from 'express'
import { getDonors, getOneDonor, postOneDonor, updateOneDonor, deleteOneDonor } from './../controllers/donors.controller'

const router = Router()

router.get('/', getDonors)
router.get('/:id', getOneDonor)
router.post('/', postOneDonor)
router.put('/:id', updateOneDonor)
router.delete('/:id', deleteOneDonor)

export default router
