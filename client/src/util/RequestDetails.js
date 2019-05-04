class RequestDetails {
  constructor (obj) {
    this.obj = obj
  }

  equals (other) {
    for (var prop in this.obj) {
      if (this.obj.hasOwnProperty(prop) && other.hasOwnProperty(prop) &&
          this[prop] !== other[prop]) {
        return false
      }
    }
    return true
  }
}

export default RequestDetails
