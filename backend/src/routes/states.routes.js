import { Router } from 'express'
import { getState, getOneState, postOneState, updateOneState, deleteOneState } from './../controllers/states.controller'

const router = Router()

router.get('/', getState)
router.get('/:id', getOneState)
router.post('/', postOneState)
router.put('/:id', updateOneState)
router.delete('/:id', deleteOneState)

export default router
