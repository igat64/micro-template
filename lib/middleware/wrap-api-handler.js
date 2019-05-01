/**
 * @file This middleware enables handlers to return an object with fields
 * "status", "headers" and "body" (last two optional). These fields represent handler response.
 */

const { isPlainObject } = require('lodash')
const { send } = require('micro')

module.exports = handler => async (req, res) => {
  const result = await handler(req, res)

  if (res.headersSent) return

  const { status, headers = null, body = null } = result

  if (isPlainObject(headers)) {
    Object.entries(headers).forEach(header => res.setHeader(...header))
  }

  send(res, status, body)
}
