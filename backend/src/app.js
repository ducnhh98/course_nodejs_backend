import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import { checkOverload } from './helpers/check.connect.js'
import router from './routers/index.js'

const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init db
import instanceMongoDB from './dbs/init.mongodb.js'
// KHÔNG GỌI instanceMongoDB() vì nó là một object, không phải function.
// Việc import ở trên đã kích hoạt constructor của Singleton rồi.
// checkOverload()

// init router
app.use('/', router)

// Khối này chỉ được gọi khi KHÔNG CÓ router nào phía trên nó khớp với URL mà người dùng yêu cầu.
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error) // ==> next(error) là một tín hiệu đặc biệt. Khi bạn truyền một cái gì đó vào hàm next(), Express sẽ bỏ qua tất cả các middleware thông thường khác và bay thẳng đến Middleware xử lý lỗi (cái có 4 tham số ở dưới).
})

//Xử lý HandlerError
app.use((error, req, res, next) => {
  // Nếu không thấy lỗi nào thì mặc định là 500 => Lỗi server
  const statusCode = error.status || 500 // Đây là status code của HTTP

  return res.status(statusCode).json({
    status: 'error',
    code: statusCode, // code ở đây ta tự định nghĩa
    message: error.message || 'Internal Server Error'
  })
})

export default app
