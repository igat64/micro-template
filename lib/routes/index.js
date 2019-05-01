const { get, post, router } = require('microrouter')

const { createBook } = require('./books')

const notFound = require('./not-found')
const healthCheck = require('./health-check')

// prettier-ignore
module.exports = router(
  get('/healthcheck', healthCheck),
  post('/books', createBook),
  notFound
)
