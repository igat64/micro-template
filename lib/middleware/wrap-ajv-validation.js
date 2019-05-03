/**
 * @file This middleware enables validate request body, query, params and etc. based on JSON Schema.
 *
 */

const micro = require('micro')
const Ajv = require('ajv')

const { get } = require('../util/fkit')

const ERROR_MODE_REPLY = 'reply'
const ERROR_MODE_THROW = 'throw'
const ERROR_MODE_INJECT = 'inject'

const defaultOptions = {
  ajv: {},
  target: 'body',
  errorMode: ERROR_MODE_REPLY,
  injectKey: 'microAjvErrors',
  createError: errors => micro.createError(400, 'Bad request'),
}

module.exports = (schema, options = {}) => handler => async (req, res) => {
  const settings = {
    ...defaultOptions,
    ...options,
    ajv: { ...defaultOptions.ajv, ...options.ajv },
  }
  const validator = new Ajv(settings.ajv)

  const isValid = validator.validate(schema, get(settings.target, req))

  if (isValid) return await handler(req, res)

  if (settings.errorMode === ERROR_MODE_REPLY) {
    return micro.sendError(req, res, settings.createError(validator.errors))
  }

  if (settings.errorMode === ERROR_MODE_THROW) {
    throw settings.createError(validator.errors)
  }

  if (settings.errorMode === ERROR_MODE_INJECT) {
    return await handler(Object.assign(req, { [settings.injectKey]: validator.errors }), res)
  }

  throw new Error(`Unknown errorMode: "${options.errorMode}"`)
}

module.exports.defaultOptions = defaultOptions
