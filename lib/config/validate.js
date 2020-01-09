const Ajv = require('ajv')
const configSchema = require('./schema')

const ajv = new Ajv()
const validate = ajv.compile(configSchema)

exports.validate = config => {
  if (!validate(config)) {
    const [{ dataPath, message }] = validate.errors
    const error = `Config${dataPath} ${message}`
    throw new Error(error)
  }
}
