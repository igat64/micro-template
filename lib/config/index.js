const { JSON_LIMIT, LOGGER_LEVEL, PORT } = process.env

const validate = require('./validate')

const config = {
  logger: {
    level: LOGGER_LEVEL || 'debug',
  },
  port: PORT || '8000',
}

validate(config)

module.exports = config
