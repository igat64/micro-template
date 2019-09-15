/**
 * @file Manage the lifecycle of the HTTP server.
 */

const micro = require('micro')
const util = require('util')

const logger = require('./logger')
const config = require('./config')

const app = require('./app')

let server = null

const start = async () => {
  logger.info({ port: config.port }, 'Starting the server')

  try {
    server = micro(app.handler)
    await util.promisify(server.listen).bind(server)(config.port)
  } catch (err) {
    logger.error(err, 'There was an error starting the server')
    throw err
  }

  logger.info('Server started')

  return server
}

const stop = async () => {
  logger.info('Stopping the server')

  try {
    await util.promisify(server.close).bind(server)()
  } catch (error) {
    logger.error(error, 'There was an error shutting down the server')
    throw error
  }

  server = null

  logger.info('Server stopped')
}

module.exports = { start, stop, server }
