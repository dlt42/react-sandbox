import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH_TOKEN
} from 'Actions'

const initialSchemaState = {
  token: null
}

function authReducer (state = initialSchemaState, action) {
  var requestDetails
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        token: action.token
      }
    case CLEAR_AUTH_TOKEN:
      return {
        token: null
      }
    default:
      return state
  }
}

export default authReducer
