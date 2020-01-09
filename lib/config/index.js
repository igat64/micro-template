const { validate } = require('./validate')

const {
  PORT,
  NODE_ENV,
  JSON_LIMIT,
  LOGGER_LEVEL,
  MONGODB_URI,
  MONGODB_NAME,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
} = process.env

const config = {
  env: {
    isDev: NODE_ENV === 'development',
  },
  server: {
    port: PORT || '8000',
  },
  logger: {
    level: LOGGER_LEVEL || 'debug',
  },
  json: {
    limit: JSON_LIMIT || '1mb',
  },
  database: {
    uri: MONGODB_URI || '127.0.0.1:27017',
    name: MONGODB_NAME || 'books',
    user: MONGODB_USERNAME,
    password: MONGODB_PASSWORD,
    options: {
      w: 'majority',
      wtimeout: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
}

module.exports = config

module.exports.validate = () => {
  validate(config)
  return module.exports
}
