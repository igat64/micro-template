const { createLogger } = require('bunyan')
const {
  logger: { level },
} = require('./config')
const { name } = require('../package.json')

module.exports = createLogger({ level, name })
