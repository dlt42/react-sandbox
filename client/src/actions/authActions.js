export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export function setAuthToken (token) {
  return {
    type: SET_AUTH_TOKEN,
    token
  }
}

export const CLEAR_AUTH_TOKEN = 'CLEAR_AUTH_TOKEN'
export function clearAuthToken () {
  return {
    type: CLEAR_AUTH_TOKEN
  }
}