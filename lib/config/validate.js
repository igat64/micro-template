const Ajv = require('ajv')
const configSchema = require('./schema')

const ajv = new Ajv()
const validate = ajv.compile(configSchema)

module.exports = config => {
  if (!validate(config)) {
    const [{ dataPath, message }] = validate.errors
    const error = `config${dataPath} ${message}`
    throw new Error(error)
  }
}
