/**
 * @file Catch unhandled errors
 */

const { sendError, createError } = require('micro')
const logger = require('../logger')

module.exports = handler => async (req, res) => {
  try {
    return await handler(req, res)
  } catch (err) {
    const error = err.statusCode ? err : createError(500, 'Internal Server Error', err)
    logger.error(err, `Error while calling: ${req.url}`)
    sendError(req, res, error)
  }
}
