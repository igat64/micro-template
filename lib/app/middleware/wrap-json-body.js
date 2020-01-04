const { json } = require('micro')

const defaultOptions = { limit: '1mb', encoding: 'utf-8' }

const set = (obj, key, val) => ((obj[key] = val), obj)

module.exports = (handler, options = null) => async (req, res) => {
  const body = await json(req, { ...defaultOptions, ...options })
  return handler(set(req, 'body', body), res)
}
