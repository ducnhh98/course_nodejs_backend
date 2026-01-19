import jwt from 'jsonwebtoken'
import { asyncHandler } from '../helpers/asyncHandler.js'
import { AuthFailureError, NotFoundError } from '../core/error.response.js'

// Service
import KeyTokenService from '../services/keyToken.service.js'

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization'
}

export const createTokenPair = async (payload, publicKey, privateKey) => {
  // 1. Tạo Access Token
  const accessToken = jwt.sign(payload, publicKey, {
    expiresIn: '2d'
  })

  // 2. Tạo Refresh Token
  const refreshToken = jwt.sign(payload, privateKey, {
    expiresIn: '7d'
  })

  // 3. Kiểm tra lại xem có đúng không
  // const decoded = jwt.verify(accessToken, publicKey)
  // console.log(`Decoded verify:`, decoded)

  return { accessToken, refreshToken }
}

export const authentication = asyncHandler(async (req, res, next) => {
  // Nhờ có asyncHandler mà không cần try...catch nữa
  // 1. Check userId missing?
  // 2. Get AccessToken
  // 3. Verify Token?
  // 4. Check User in Dbs?
  // 5. Check keyStore with userId?
  // 6. OK all ==> Return

  // 1
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthFailureError('Invalid Request')

  // 2
  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not Found keyStore')

  // 3
  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthFailureError('Invalid Request')

  try {
    const decodeUser = jwt.verify(accessToken, keyStore.publicKey)
    if (userId !== decodeUser.userId) {
      throw new AuthFailureError('Invalid userId')
    }
    req.keyStore = keyStore // Nếu authen thành công thì gắn giá trị keyStore vào luôn để dễ sử dụng
    return next()
  } catch (error) {
    throw error
  }
})

export const createTokenPairHighLevel = async (
  payload,
  publicKey,
  privateKey
) => {
  try {
    // 1. Tạo Access Token
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2d'
    })

    // 2. Tạo Refresh Token
    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '7d'
    })

    // 3. Kiểm tra lại với Public Key (Tùy chọn - Nên dùng khi mới setup Key)
    // Sử dụng cách viết đồng bộ để bắt lỗi ngay trong block catch
    const decoded = jwt.verify(accessToken, publicKey, {
      algorithms: ['RS256']
    })
    console.log(`Decoded payload:`, decoded)

    return { accessToken, refreshToken }
  } catch (error) {
    console.error(`[Error] CreateTokenPair failed: ${error.message}`)
    // Ném lỗi ra ngoài để tầng Controller có thể bắt được (ví dụ trả về 500 Error)
    throw new Error(error.message)
  }
}
