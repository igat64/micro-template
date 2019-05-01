const { json } = require('micro')

module.exports = (handler, options = { limit: '1mb', encoding: 'utf-8' }) => async (req, res) =>
  handler(Object.assign(req, { body: await json(req, options) }), res)
