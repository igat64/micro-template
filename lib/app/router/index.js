const { get, post, router } = require('microrouter')

const { healthCheck, notFound, postBook } = require('./handlers')

module.exports = router(get('/healthcheck', healthCheck), post('/books', postBook), notFound)
