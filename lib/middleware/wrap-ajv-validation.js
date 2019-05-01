/**
 * @file This middleware enables validate request body, query, params and etc. based on JSON Schema.
 * Thinking on publishing this middleware to the NPM.
 */

const { sendError, createError } = require('micro')
const Ajv = require('ajv')

const get = (path, obj) => path.split('.').reduce((acc, current) => acc && acc[current], obj)

const MODE_REPLY_ERROR = 'reply'
const MODE_THROW_ERROR = 'throw'
const MODE_INJECT_ERROR = 'inject'

const defaultOptions = {
  ajv: {},
  target: 'body',
  mode: MODE_REPLY_ERROR,
  injectKey: 'ajvErrors',
  createError: errors => createError(400, 'Bad request'),
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

  if (settings.mode === MODE_REPLY_ERROR) {
    return sendError(req, res, settings.createError(validator.errors))
  }

  if (settings.mode === MODE_THROW_ERROR) {
    throw settings.createError(validator.errors)
  }

  if (settings.mode === MODE_INJECT_ERROR) {
    return await handler(Object.assign(req, { [settings.injectKey]: validator.errors }), res)
  }

  throw new Error(`Unknown mode: "${options.mode}"`)
}
