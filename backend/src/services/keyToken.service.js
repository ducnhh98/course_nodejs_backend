import keyTokenModel from '../models/keytoken.model.js'

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey
      })

      return tokens ? tokens.publicKey : null
    } catch (error) {
      console.error('KeyTokenService Error:', error)
      return null // Trả về null để AccessService biết là đã thất bại
    }
  }

  static createKeyTokenHighLevel = async ({ userId, publicKey }) => {
    try {
      // Trong video ytb : const publicKeyString = publicKey.toString()
      // Nếu publicKey là KeyObject, cần export ra định dạng 'pem'
      // Nếu ở AccessService bạn đã để format: 'pem' rồi thì không cần toString()
      const publicKeyString =
        typeof publicKey !== 'string'
          ? publicKey.export({ type: 'pkcs1', format: 'pem' })
          : publicKey

      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString
      })

      // Trả về chính cái publicKeyString để dùng cho việc verify ngay sau đó
      return tokens ? tokens.publicKey : null
    } catch (error) {
      console.error('KeyTokenService Error:', error)
      return null // Trả về null để AccessService biết là đã thất bại
    }
  }
}

export default KeyTokenService
