module.exports.get = (path, obj) =>
  path.split('.').reduce((acc, current) => acc && acc[current], obj)

module.exports.isPlainObject = value =>
  value &&
  typeof value === 'object' &&
  (value.__proto__ == null || value.__proto__ === Object.prototype)

module.exports.compose = fns => fns.reduce((f, g) => (...args) => f(g(...args)))
