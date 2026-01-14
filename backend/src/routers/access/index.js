import express from 'express'
import accessController from '../../controllers/access.controller.js'

const router = express.Router()

router.post('/shop/signup', accessController.signUp)

router.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome NHHD'
  })
})

export default router
