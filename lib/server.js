/**
 * @file Manage the lifecycle of the HTTP server.
 */

const micro = require('micro')
const util = require('util')

const { name, version } = require('../package')

const app = require('./app')
const logger = require('./logger')
const config = require('./config')

const startServer = async () => {
  const server = micro(app)

  await util.promisify(server.listen).bind(server)(config.port)

  process.on('SIGTERM', async () => {
    logger.debug('Server shutting down')
    try {
      await stopServer(server)
      process.exit(0)
    } catch (err) {
      logger.error(err, 'There was an error shutting down the server')
      process.exit(1)
    }
  })

  logger.info(name, { port: config.port, version })

  return server
}

const stopServer = async server => {
  await util.promisify(server.close).bind(server)()
}

module.exports = { startServer, stopServer }

if (require.main === module) {
  startServer().catch(err => logger.error(err, 'There was a problem starting the server'))
}
