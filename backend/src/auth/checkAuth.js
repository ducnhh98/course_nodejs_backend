import { BadRequestError } from '../core/error.response.js'

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}
import { findById, createRandonApiKey } from '../services/apiKey.service.js'

export const apiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]?.toString()
  // console.log('New API : ', createRandonApiKey())
  if (!key) {
    throw new BadRequestError('No apiKey found on Header')
  }

  //check objKey
  const objKey = await findById(key)
  if (!objKey) {
    throw new BadRequestError('No apiKey found on Database')
  }
  req.objKey = objKey
  return next()
}

// closure trình bao đóng ==> trả về 1 hàm mà hàm đó có thể sử dụng các biến của hàm cha

export const permission = (permission) => {
  return (req, res, next) => {
    // Kiểm tra có Permission hay không?
    if (!req.objKey.permissions) {
      throw new BadRequestError('Permission denied')
    }

    // Nếu có Permission thì kiểm tra có hợp lệ hay không
    // console.log('Permissions::', req.objKey.permissions)

    // validPermission trả về true/false
    const validPermission = req.objKey.permissions.includes(permission)

    if (!validPermission) {
      throw new BadRequestError('Permission denied')
    }

    return next()
  }
}

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
