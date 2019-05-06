const { get, post, router } = require('microrouter')

const { compose } = require('../util/fkit')

const { wrapJsonBody, wrapAjvValidation } = require('../middleware')

const notFound = require('./not-found')
const healthCheck = require('./health-check')

const books = require('../api/books')

// prettier-ignore
const createBookHandler = compose([
  wrapJsonBody,
  wrapAjvValidation(books.schema)
])(books.create)

module.exports = router(
  get('/healthcheck', healthCheck),
  post('/books', createBookHandler),
  notFound,
)
