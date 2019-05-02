const { compose } = require('../../util/fkit')

const { wrapJsonBody, wrapAjvValidation } = require('../../middleware')
const { bodySchema, querySchema } = require('./schema')

// book creation business logic
const createBook = req => ({ status: 200, body: req.body })

// enhance (decorate) "createBook" handler
module.exports.createBook = compose([
  wrapJsonBody,
  wrapAjvValidation(bodySchema),
  wrapAjvValidation(querySchema, { target: 'query' }),
])(createBook)
