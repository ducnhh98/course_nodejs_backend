import mongoose from 'mongoose'
import config from '../configs/config.mongodb.js'

const { url } = config.db.host

class Database {
  constructor() {
    this.connect()
  }

  async connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    // mongoose
    //   .connect(url, {
    //     maxPoolSize: 50 // Kinh nghiệm: Nên giới hạn pool size cho hệ thống ERP/Enterprise
    //   })
    //   .then((_) => console.log('Connected MongoDB Success'))
    //   .catch((err) => console.log(`Error Connect: ${err}`))

    try {
      const conn = await mongoose.connect(url)
      console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
      console.log('MongoDB connection error:', error)
    }
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
