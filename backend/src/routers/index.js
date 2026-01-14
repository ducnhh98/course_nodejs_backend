import express from 'express'
import accessRouter from './access/index.js' //Vì trong './access/index.js' là 'export default router;'

const router = express.Router()

router.use('/v1/api/', accessRouter)

export default router
