'use strict'

const books = require('../../services/books')

exports.schema = {
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

// const validate = payload =>

exports.create = async payload => {
  await books.save(payload)

  return {
    status: 201,
    body: payload,
  }
}
