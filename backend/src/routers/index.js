import express from 'express'
import accessRouter from './access/index.js' //Vì trong './access/index.js' là 'export default router;'
import { apiKey, permission } from '../auth/checkAuth.js'
import { asyncHandler } from '../helpers/asyncHandler.js'

const router = express.Router()

//check apiKey
router.use(asyncHandler(apiKey))
//check permissions
router.use(asyncHandler(permission('0000')))

router.use('/v1/api/', accessRouter)

export default router
