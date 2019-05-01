const { wrapJsonBody, wrapAjvValidation } = require('../../middleware')
const { bodySchema, querySchema } = require('./schema')

// util
const compose = fns => fns.reduce((f, g) => (...args) => f(g(...args)))

// book creation business logic
const createBook = req => ({ status: 200, body: req.body })

// enhance (decorate) "createBook" handler
module.exports.createBook = compose([
  wrapJsonBody,
  wrapAjvValidation(bodySchema),
  wrapAjvValidation(querySchema, { target: 'query' }),
])(createBook)
