/**
 * @file Manage lifecycle of the HTTP server
 */

const micro = require('micro')
const util = require('util')

const logger = require('./logger')

const config = require('./config')
const mongo = require('./mongo')
const app = require('./app')

/**
 * @type {http.Server|null}
 */
exports.server = null
exports.start = start
exports.stop = stop

async function start() {
  if (exports.server) {
    logger.debug('Server: attempt to start the server when it already started')
    return
  }

  logger.info({ port: config.server.port }, 'Server: starting')

  const deps = { config, db: mongo.client }
  exports.server = micro(app.handler(deps))

  await listen(exports.server, config.server.port)

  logger.info('Server: started')

  return exports.server
}

async function stop() {
  if (!exports.server) {
    logger.warn(`Server: attempt to stop the server when it is not initialized`)

    exports.server = null
    return
  }
  if (!exports.server.listening) {
    logger.warn(
      `Server: attempt to stop the server when it is initialized but port ${config.server.port} is not listening yet`,
    )

    exports.server = null
    return
  }

  logger.info('Server: stopping')

  await util.promisify(exports.server.close).bind(exports.server)()
  exports.server = null

  logger.info('Server: stopped')
}

const listen = async (server, port) =>
  new Promise((resolve, reject) => {
    server.on('listening', resolve)
    server.on('error', reject)
    server.listen(port, resolve)
  })
