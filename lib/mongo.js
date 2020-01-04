/**
 * @file Manage the lifecycle of the Database connection.
 */

const { MongoClient } = require('mongodb')

const logger = require('./logger')
const config = require('./config')

/**
 * @type {MongoClient|null}
 */
exports.client = null
exports.connect = connect
exports.disconnect = disconnect

async function connect() {
  if (exports.client) {
    logger.debug('Database: attempt to establish a connection when it already is')
    return
  }

  logger.info('Database: connecting')

  exports.client = await MongoClient.connect(
    createConnectionString(config.database),
    config.database.options,
  )

  logger.info('Database: connection established')

  return exports.client
}

async function disconnect() {
  if (!exports.client) {
    logger.debug('Database: attempt to disconnect when a connection is not established')
    return
  }

  logger.info('Database: disconnecting')

  await exports.client.close()
  exports.client = null

  logger.info('Database: disconnected')
}

const createConnectionString = ({ uri, name, user, password }) => {
  const auth = user && password ? `${user}:${password}@` : ''
  const [uriString, queryString = ''] = uri.replace('mongodb://', '').split('?')

  const uriStringWithoutTrailingSlash = uriString.replace(/\/$/, '')
  const mongoUri = `${uriStringWithoutTrailingSlash}/${name}?${queryString}`

  return `mongodb://${auth}${mongoUri}`
}
