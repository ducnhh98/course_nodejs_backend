import shopModel from '../models/shop.model.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import KeyTokenService from './keyToken.service.js'
import { createTokenPair } from '../auth/authUtils.js'
import { getInfoData } from '../utils/index.js'

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // 1. Kiểm tra input
      if (!name || !email || !password) {
        return { code: '4000', message: 'All fields are required' }
      }

      const existingShop = await shopModel.findOne({ email }).lean()
      if (existingShop) {
        return { code: '4000', message: 'Email already exists' }
      }

      // 2. Hash password
      const passwordHash = await bcrypt.hash(password, 10)

      // 3. Tạo dữ liệu trong Database cho table Shop
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP]
      })

      // 4. Tạo token cho user
      if (newShop) {
        // 5. Tạo ngẫu nhiên privateKey và publicKey
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        // 6. Tạo dữ liệu trong Database cho table Key
        // keyStore là publicKey trong database
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey
        })

        // Nếu thêm dữ liệu vào table Key vị lỗi thì
        if (!keyStore) {
          return { code: 'xxxx', message: 'keyStore storage error' }
        }

        // 7. Tạo AccessToken và RefreshToken từ privateKey, publicKey
        // AccessToken được tạo bằng publicKey
        // RefreshToken được tạo bằng privateKey
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        )

        console.log(`Created token success:`, tokens)

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ['_id', 'name', 'email'],
              object: newShop
            }),
            tokens
          }
        }
      }

      return { code: 200, metadata: null }
    } catch (error) {
      console.error('SignUp Error:', error)
      return { code: 'xxx', message: error.message, status: 'error' }
    }
  }

  static signUpHighLevel = async ({ name, email, password }) => {
    try {
      // 1. Check input data (Nên dùng thư viện như Joi hoặc Zod sẽ chuyên nghiệp hơn)
      if (!name || !email || !password) {
        return { code: '4000', message: 'All fields are required' }
      }

      // 2. Check if Shop existed
      const existingShop = await shopModel.findOne({ email }).lean()
      if (existingShop) {
        return { code: '4000', message: 'Email already exists' }
      }

      // 3. Hash password
      const passwordHash = await bcrypt.hash(password, 10)

      // 4. Create Shop
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP]
      })

      if (newShop) {
        // 5. Generate Keys (RSA)
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: { type: 'pkcs1', format: 'pem' }, // Chuyển sang PEM để dễ lưu trữ; pkcs1 = Public Key CryptoGraphy Standard 1
          privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
        })

        // Lưu Public Key vào Database
        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey: publicKey // Lúc này là chuỗi PEM
        })

        if (!publicKeyString) {
          return { code: 'xxxx', message: 'PublicKey storage error' }
        }

        //??? Chi vậy trời??
        const publicKeyObject = crypto.createPublicKey(publicKeyString)
        // 6. Tạo cặp Token
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKeyObject,
          privateKey
        )

        console.log(`Created token success:`, tokens)

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ['_id', 'name', 'email'],
              object: newShop
            }),
            tokens
          }
        }
      }

      return { code: 200, metadata: null }
    } catch (error) {
      // Log lỗi chi tiết để debug
      console.error('SignUp Error:', error)
      return { code: 'xxx', message: error.message, status: 'error' }
    }
  }
}

export default AccessService
