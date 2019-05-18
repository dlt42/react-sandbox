const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config');

const excluded = [ '/login', '/signup', '/']

// The authentication check middleware function.
module.exports = (req, res, next) => {

  // Ignore routes that do not require authentication
  if (excluded.indexOf(req.originalUrl) > -1) {
    return next()
  }

  // If the headers do not contain an authorisation element then return the 401 code (unauthorized)
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  // Get the header authorization element
  const { 
    headers: { 
      authorization 
    } 
  } = req

  // Get the token
  var token = null
  if (authorization) {
    const authorizationParts = authorization.split(' ')
    if (authorizationParts[0] === 'Token') {
      token = authorizationParts[1]
    }
  }

  // Decode the token using a secret key-phrase
  return jwt.verify(token, config.secret, (err, decoded) => {

    // If there is an error verifying the token then return the 401 code (unauthorized)
    if (err) { 
      return res.status(401).end()
    }

    const userId = decoded.sub

    // Check if a user exists
    return User.findById(userId, (userErr, user) => {

      // If there is an error finding the user or the user does not exist
      // then return the 401 code (unauthorized)
      if (userErr || !user) {
        return res.status(401).end()
      }

      // Pass on the user details
      req.user = user

      // Continue to process the request
      return next()
    })
  })
}
