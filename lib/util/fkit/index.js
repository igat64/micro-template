module.exports.compose = fns => fns.reduce((f, g) => (...args) => f(g(...args)))

module.exports.isPlainObject = value =>
  value &&
  typeof value === 'object' &&
  (value.__proto__ == null || value.__proto__ === Object.prototype)
