const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router()

const check = (obj, attr) => {
  console.log(typeof obj[attr])
  return !obj || typeof obj[attr] !== 'string'
}

/**
 * Validate the sign up form
 */
function validateSignupForm(payload) {
  const errors = {}
  let valid = true
  let message = ''

  if (check(payload, 'email') || !validator.isEmail(payload.email)) {
    valid = false
    errors.email = 'Please provide a correct email address.'
  }

  if (check(payload, 'password') || payload.password.trim().length < 8) {
    valid = false
    errors.password = 'Password must have at least 8 characters.'
  }

  if (check(payload, 'name') || payload.name.trim().length === 0) {
    valid = false
    errors.name = 'Please provide your name.'
  }

  if (!valid) {
    message = 'Check form errors'
  }

  return {
    success: valid,
    message,
    errors
  }
}

/**
 * Validate the login form
 */
function validateLoginForm(payload) {
  console.log(payload)
  const errors = {}
  let valid = true
  let message = ''

  if (check(payload, 'email') || payload.email.trim().length === 0) {
    valid = false
    errors.email = 'Email address required'
  }

  if (check(payload, 'password') || payload.password.trim().length === 0) {
    valid = false
    errors.password = 'Password required'
  }

  if (!valid) {
    message = 'Check form errors'
  }

  return {
    success: valid,
    message,
    errors
  }
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (error) => {
    if (error) {

      // Handle a duplicate ID error (email)
      if (error.name === 'MongoError' && error.code === 11000) {

        // Return a 409 HTTP status code for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check form errors',
          errors: {
            email: 'Email taken'
          }
        })
      }

      // Return a 400 HTTP status code for a generic error
      return res.status(400).json({
        success: false,
        message: 'Could not process form'
      })
    }

    // Return a 200 HTTP status code for success
    return res.status(200).json({
      success: true,
      message: 'Successful signup'
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  console.log(req.body)
  const validationResult = validateLoginForm(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (error, token, userData) => {
    if (error) {

      // Return a 400 HTTP status code for an invalid credentials error
      if (error.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: error.message
        })
      }

      // Return a 400 HTTP status code for a generic error
      return res.status(400).json({
        success: false,
        message: 'Could not process form'
      })
    }

    // Return the login token to the client 
    return res.json({
      success: true,
      message: 'Successful login',
      token,
      user: userData
    })
  })(req, res, next)
})

/*
router.get('/users', (req, res) => {
  User.find({}, function(err, users) {
    res.json(users);
  })
})
*/

module.exports = router