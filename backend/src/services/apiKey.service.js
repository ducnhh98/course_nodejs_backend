import apikeyModel from '../models/apikey.model.js'
import crypto from 'crypto'

export const findById = async (key) => {
  const objKey = await apikeyModel.findOne({ key, status: true }).lean()

  return objKey
}

export const createRandonApiKey = async () => {
  const newKey = await apikeyModel.create({
    key: crypto.randomBytes(64).toString('hex'),
    permissions: ['0000']
  })
  return newKey
}
