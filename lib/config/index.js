const { JSON_LIMIT, LOGGER_LEVEL, PORT, NODE_ENV } = process.env

const validate = require('./validate')

const config = {
  isDev: NODE_ENV === 'development',
  logger: {
    level: LOGGER_LEVEL || 'debug',
  },
  port: PORT || '8000',
  json: {
    limit: JSON_LIMIT || '1mb',
  },
}

validate(config)

module.exports = config
