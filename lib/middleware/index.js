/**
 * @file The middleware namespace contains any custom middleware we want to use in our application
 */

const wrapAjvValidation = require('micro-ajv')

const wrapCatchError = require('./wrap-catch-error')
const wrapApiHandler = require('./wrap-api-handler')
const wrapJsonBody = require('./wrap-json-body')

module.exports = {
  wrapAjvValidation,
  wrapCatchError,
  wrapApiHandler,
  wrapJsonBody,
}
