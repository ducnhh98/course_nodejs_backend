import mongoose from 'mongoose'
import config from '../configs/config.mongodb.js'

const { url } = config.db.host

const connectString = url

class Database {
  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {
    // Bật debug khi ở môi trường development
    // if (process.env.NODE_ENV !== 'production') {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 50 // Kinh nghiệm: Nên giới hạn pool size cho hệ thống ERP/Enterprise
      })
      .then((_) => console.log('Connected MongoDB Success PRO'))
      .catch((err) => console.log(`Error Connect: ${err}`))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongoDB = Database.getInstance()
export default instanceMongoDB
