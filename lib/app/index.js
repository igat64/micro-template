/**
 * @file This is the root handler for requests and responses that aggregates all the routes
 */

const router = require('./router')
const { wrapApiHandler, wrapCatchError } = require('./middleware')

const handler = wrapCatchError(wrapApiHandler(router))

module.exports = { handler }
