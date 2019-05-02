const { json } = require('micro')

const defaultOptions = { limit: '1mb', encoding: 'utf-8' }

module.exports = (handler, options = null) => async (req, res) =>
  handler({ ...req, body: await json(req, { ...defaultOptions, ...options }) }, res)
