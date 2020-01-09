'use strict'

const { name, version } = require('../package')

const config = require('./config')
const logger = require('./logger')
const server = require('./server')
const mongo = require('./mongo')

module.exports = main

if (require.main === module)
  main().catch(e => {
    throw e
  })

async function main() {
  config.validate()

  process.on('SIGTERM', async () => {
    logger.info('Service: Got SIGTERM')

    down()
      .then(() => process.exit(0))
      .catch(err => logger.error(err, 'Service: shutdown error'))
      .then(() => process.exit(1))
  })

  up()
    .catch(err => {
      logger.error(err, 'Service: bootstrap error')
      return down()
    })
    .catch(err => {
      logger.error(err, 'Service: shutdown error')
      process.exit(1)
    })
}

async function up() {
  logger.info({ name, version }, 'Service: starting')

  await mongo.connect()
  await server.start()

  logger.info('Service: started')
}

async function down() {
  logger.info('Service: stopping')

  await mongo.disconnect()
  await server.stop()

  logger.info('Service: stopped')
}
