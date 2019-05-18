const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const PassportLocalStrategy = require('passport-local').Strategy
const config = require('../config')

const createCredentialsError = (done) => {
  const error = new Error('Incorrect email or password')
  error.name = 'IncorrectCredentialsError'
  return done(error);
}

// Define the passport local strategy
module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  }, 
  (req, email, password, done) => {

    const userData = {
      email: email.trim(),
      password: password.trim()
    }

    // Find a user by email address
    return User.findOne({ email: userData.email }, (err, user) => {
      if (err) { 
        return done(err)
      }

      if (!user) {
        return createCredentialsError(done)
      }

      console.log("Found user")

      // Check if the user's hashed password is equal to the value stored in the database
      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (err) { 
          return done(err)
        }

        if (!isMatch) {
          return createCredentialsError(done)
        }

        console.log("Password match")

        const payload = {
          sub: user._id
        }

        // Create a token string for the client
        const token = jwt.sign(payload, config.secret)
        const data = {
          name: user.name
        }
        return done(null, token, data)
      })
    })
  }
)
