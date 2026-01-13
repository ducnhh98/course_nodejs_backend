import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import { checkOverload } from './helpers/check.connect.js'

const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init db
import instanceMongoDB from './dbs/init.mongodb.js'
// KHÔNG GỌI instanceMongoDB() vì nó là một object, không phải function.
// Việc import ở trên đã kích hoạt constructor của Singleton rồi.
// checkOverload()

// init router
app.get('/', (req, res, next) => {
  const strCompress = 'Hello World'

  return res.status(200).json({
    message: 'Welcome',
    metadata: strCompress.repeat(1000)
  })
})

// handling error

export default app
