'use strict'

const { send } = require('micro')

const { compose } = require('../../util/fkit')

const books = require('../api/books')
const { wrapJsonBody, wrapAjvValidation } = require('../middleware')

exports.healthCheck = (req, res) => ({ status: 200, body: { ping: 'pong' } })

exports.notFound = (req, res) => send(res, 404, 'Not found')

exports.postBook = compose([
  wrapJsonBody,
  // wrapAjvValidation(books.schema),
  handler => async req => handler(req.body),
])(books.create)
