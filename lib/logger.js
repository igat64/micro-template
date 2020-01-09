const { createLogger } = require('bunyan')

const { name } = require('../package.json')

const config = require('./config')

module.exports = createLogger({ level: config.logger.level, name })
