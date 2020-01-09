module.exports = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Book',
  description: '',
  required: ['logger', 'server'],
  properties: {
    server: { $ref: '#/definitions/Server' },
    logger: { $ref: '#/definitions/Logger' },
  },
  definitions: {
    Server: {
      type: 'object',
      required: ['port'],
      properties: {
        port: {
          type: 'string',
          pattern: '^[0-9]{2,5}$',
        },
      },
    },
    Logger: {
      type: 'object',
      required: ['level'],
      properties: {
        level: {
          type: 'string',
          enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
        },
      },
    },
  },
}
