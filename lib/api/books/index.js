module.exports.schema = {
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

module.exports.create = req => ({ status: 200, body: req.body })
