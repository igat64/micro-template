/**
 * (c) Copyright Reserved EVRYTHNG Limited 2019.
 * All rights reserved. Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

'use strict'

const { name, version } = require('../package')

const config = require('./config')
const logger = require('./logger')

const server = require('./server')

async function up() {
  logger.info({ name, version }, 'Starting the service')
  await server.start()
  // await new Promise((res, rej) => setTimeout(() => rej(Error('UP ERROR')), 3000))
  logger.info('Service started')
}

async function down() {
  logger.info('Stopping the service')
  await server.stop()
  // await new Promise((res, rej) => setTimeout(() => rej(Error('DOWN ERROR')), 2000))
  logger.info('Service stopped')
}

async function main() {
  process.on('SIGTERM', async () => {
    logger.debug('SIGTERM signal sent')

    down()
      .then(() => process.exit(0))
      .catch(err => logger.error(err, 'Service graceful shutdown error'))
      .then(() => process.exit(1))
  })

  up()
    .catch(err => {
      logger.error(err, 'Service bootstrap error')
      return down()
    })
    .catch(err => {
      logger.error(err, 'Service shutdown error')
      process.exit(1)
    })
}

module.exports = main

if (require.main === module) main()
