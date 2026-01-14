import 'dotenv/config'
import app from './src/app.js'
import config from './src/configs/config.mongodb.js'

const { port } = config.app

const PORT = port || 3055

const server = app.listen(PORT, () => {
  console.log(`eCommerce running on  http://localhost:${PORT}`)
})

// Khi nhấn Ctrl + C
process.on('SIGINT', () => {
  server.close(async () => {
    console.log(`Express Server closed.`)

    // Giả sử bạn muốn đóng cả connection của Mongoose
    // import mongoose from 'mongoose'
    // await mongoose.connection.close()

    console.log(`MongoDB connection closed.`)
    process.exit(0)
  })
})
