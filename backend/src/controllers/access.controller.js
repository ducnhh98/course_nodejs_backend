import AccessService from '../services/access.service.js'
import { OK, CREATED } from '../core/success.response.js'

class AccessController {
  login = async (req, res, next) => {
    new OK({
      message: 'Login successfully',
      metadata: await AccessService.login(req.body)
    }).send(res)
  }

  logout = async (req, res, next) => {
    new OK({
      message: 'Logout successfully',
      metadata: await AccessService.logout(req.keyStore)
    }).send(res)
  }

  signUp = async (req, res, next) => {
    //console.log(`[POST]::/shop/signup`, req.body)
    new CREATED({
      message: 'Registered OK',
      metadata: await AccessService.signUp(req.body)
    }).send(res)
  }
}

export default new AccessController()
