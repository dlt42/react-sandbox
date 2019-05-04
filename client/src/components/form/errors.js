export function transformErrors (errors, schema, uischema, formData) {
  errors = errors.filter(error => {
    const field = error.property.substring(1);
    const required = schema.required.indexOf(field) > -1
    const errorName = error.name
    const isBlank = formData[field] === ""
    const emptyIgnoreList = ["minLength", "format"]

    // Don't raise errors if not required and blank
    if (!required && isBlank && emptyIgnoreList.indexOf(errorName) > -1) {
      return false
    }
    return true
  })
  return errors.map(error => {
    const field = error.property.substring(1);
    const regExp = new RegExp("\\" + error.property)
    const fieldTitle = uischema[field].title

    // Replace the internal name with the label 
    error.stack = error.stack.replace(regExp, fieldTitle + ":")
    return error;
  })
}