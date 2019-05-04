export const classNames = (nameMap) => {
  return Object.entries(nameMap).map(([key, value]) => value ? key : '').join(' ')
}

export const anyDifference = (objectA, objectB, attributes, comparator) => {
  return attributes.some(attribute => comparator ? comparator(objectA[attribute], objectB[attribute]) : objectA[attribute] !== objectB[attribute])
}

const findNestedByAtt = (obj, value, key, att, comparator) => {
  const items = (obj[key] || [])
  var results = items.filter(item => (comparator ? comparator(value, item[att]) : item[att] === value))
  items.forEach(item => { results = results.concat(findNestedByAtt(item, value, key, att, comparator)) })
  return results
}

export const findNestedByAttribute = (obj, id, key, att, comparator) => {
  var results = findNestedByAtt(obj, id, key, att, comparator)
  return results && results.length > 0 ? results[0] : null
}

export const findNestedAttributeByAttribute = (obj, id, key, valueAtt, att) => {
  var result = findNestedByAttribute(obj, id, key, att)
  return result ? result[valueAtt] : null
}
