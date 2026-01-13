const dev = {
  app: {
    port: process.env.DEV_APP_PORT
  },
  db: {
    host: {
      url: process.env.MONGODB_URI
    }
  }
}

const prod = {
  app: {
    port: process.env.PRO_APP_PORT
  },
  db: {
    host: {
      url: process.env.MONGODB_URI
    }
  }
}

const config = { dev, prod }
const env = process.env.NODE_ENV || 'dev'
export default config[env]
