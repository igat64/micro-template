/**
 * @file This middleware enables handlers to return an object with fields
 * "status" (required), "headers" and "body". These fields represent handler response.
 */

const { send } = require('micro')

const { isPlainObject } = require('../../util/fkit')

module.exports = handler => async (req, res) => {
  const result = await handler(req, res)

  if (res.headersSent) return

  const { status, headers = { 'content-type': 'application/json' }, body = null } = result

  if (isPlainObject(headers)) {
    Object.entries(headers).forEach(header => res.setHeader(...header))
  }

  send(res, status, body)
}
