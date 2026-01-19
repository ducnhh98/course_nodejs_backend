import keyTokenModel from '../models/keytoken.model.js'
import { Types } from 'mongoose'

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken
  }) => {
    const filter = { user: userId },
      update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
      options = { upsert: true, new: true }

    const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

    return tokens ? tokens.publicKey : null
  }

  static findByUserId = async (userId) => {
    return await keyTokenModel
      .findOne({ user: new Types.ObjectId(userId) })
      .lean()
  }

  static removeKeyById = async (id) => {
    return await keyTokenModel.deleteOne(id)
  }

  static createKeyTokenLowLevel = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey
      })

      return tokens ? tokens.publicKey : null
    } catch (error) {
      console.error('KeyTokenService Error:', error)
      return error
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
