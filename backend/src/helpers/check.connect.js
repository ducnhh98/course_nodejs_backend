import mongoose from 'mongoose'
import os from 'os'
import process from 'process'

// Khai báo hằng số
const _SECONDS = 5000

// Đếm số lượng kết nối
const countConnect = () => {
  const numConnection = mongoose.connections.length
  console.log(`Number of connections : ${numConnection}`)
}

// Kiểm tra số lượng connect over load
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    // Example maximum number of connections based on number of cores
    const maxConnection = numCores * 5 // Ví dụ mỗi Core chiệu được 5 connections

    console.log(`Active connection: ${numConnection}`)
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

    if (numConnection > maxConnection) {
      console.log('Connection overload detected')
    }
  }, _SECONDS) // Monitor every 5 second
}

export { countConnect, checkOverload }
