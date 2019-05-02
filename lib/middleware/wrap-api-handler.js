/**
 * @file This middleware enables handlers to return an object with fields
 * "status", "headers" and "body" (last two optional). These fields represent handler response.
 */

const { send } = require('micro')

// util
const isPlainObject = value =>
  value &&
  typeof value === 'object' &&
  (value.__proto__ == null || value.__proto__ === Object.prototype)

module.exports = handler => async (req, res) => {
  const result = await handler(req, res)

  if (res.headersSent) return

  const { status, headers = null, body = null } = result

  if (isPlainObject(headers)) {
    Object.entries(headers).forEach(header => res.setHeader(...header))
  }

  send(res, status, body)
}
