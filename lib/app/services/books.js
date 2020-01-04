'use strict'

const { database } = require('../../config')
const mongo = require('../../mongo')

const books = () => mongo.client.db(database.name).collection('books')

exports.find = async title => books().findOne({ title })
exports.save = async book => books().insertOne(book)
exports.delete = async book => books().deleteOne(book)
exports.update = async (title, book) => book.updateOne({ title }, { $set: book })
exports.exists = async title => !!(await books().findOne({ title }, { projection: { title: 1 } }))
