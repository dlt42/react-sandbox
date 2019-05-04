/*
 * Not used - wrong approach for modifying response data
 * --middlewares 'data/listConverter.js'
 */
module.exports = (req, res, next) => {
  var regex = /\/[A-Za-z0-9?=]*/g
  var parts = req.path.match(regex)
  if (parts.length === 2 && parts[0] === '/formData') {
    const schemaId = parts[1].substring(1)
    res.data[schemaId] = res.data[schemaId].filter(item => { return { id: item.id, label: item.label } })
  }
  next()
}
