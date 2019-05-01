/**
 * @file This is the root handler for the requests and responses that aggregates all the routes.
 */

const routes = require('./routes')
const { wrapApiHandler, wrapCatchError } = require('./middleware')

const app = wrapCatchError(wrapApiHandler(routes))

module.exports = app
