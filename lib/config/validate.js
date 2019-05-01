const Ajv = require('ajv')
const configSchema = require('./schema')

const ajv = new Ajv()
const validate = ajv.compile(configSchema)

/**
 * Check the config based on schema
 *
 * @param {Object} config - Config object.
 * @returns {undefined}
 */
module.exports = config => {
  if (!validate(config)) {
    const [{ dataPath, message }] = validate.errors
    // console.log(validate.errors);
    const error = `config${dataPath} ${message}`
    throw new Error(error)
  }
}
