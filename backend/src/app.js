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

// handling error

export default app
