const { levelFromName } = require('bunyan')

const levels = Object.keys(levelFromName)

module.exports = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: '',
  description: '',
  required: ['logger', 'port'],
  properties: {
    port: {
      type: 'string',
      pattern: '^[0-9]{2,5}$',
    },
  },
  definitions: {
    Logger: {
      type: 'object',
      required: ['level'],
      properties: {
        level: {
          type: 'string',
          enum: levels,
        },
      },
    },
  },
}
