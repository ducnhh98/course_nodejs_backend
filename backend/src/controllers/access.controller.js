import AccessService from '../services/access.service.js'

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[POST]::/shop/signup`, req.body)
      return res.status(201).json(await AccessService.signUp(req.body))
    } catch (error) {
      next(error)
    }
  }
}

export default new AccessController()
