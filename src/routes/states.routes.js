import { Router } from 'express'
import { stateController } from './../controllers/states.controller'

const router = Router()

router.get('/', stateController.getStates)
router.get('/:id', stateController.getOneState)
router.post('/', stateController.postOneState)
router.put('/:id', stateController.updateOneState)
router.delete('/:id', stateController.deleteOneState)

export default router
