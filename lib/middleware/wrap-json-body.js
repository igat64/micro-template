const { json } = require('micro')

const DEFAULT_OPTS = { limit: '1mb', encoding: 'utf-8' }

module.exports = (handler, options = null) => async (req, res) =>
  handler(Object.assign(req, { body: await json(req, { ...DEFAULT_OPTS, ...options }) }), res)
