module.exports.bodySchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Book',
  required: ['title', 'authors', 'year'],
  properties: {
    title: {
      type: 'string',
      minLength: 2,
      maxLength: 256,
    },
    authors: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true,
    },
    year: {
      type: 'integer',
      minimum: 0,
    },
  },
}

module.exports.querySchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  required: ['accessKey'],
  properties: {
    title: {
      type: 'string',
      minLength: 8,
      maxLength: 8,
    },
  },
}
