import jwt from 'jsonwebtoken'

export const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // 1. Tạo Access Token
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: '2d'
    })

    // 2. Tạo Refresh Token
    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: '7d'
    })

    // 3. Kiểm tra lại xem có đúng không
    const decoded = jwt.verify(accessToken, publicKey)
    console.log(`Decoded verify:`, decoded)

    return { accessToken, refreshToken }
  } catch (error) {
    console.error(`[Error] CreateTokenPair failed: ${error.message}`)
    throw new Error(error.message)
  }
}

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
