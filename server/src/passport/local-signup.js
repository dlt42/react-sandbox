const User = require('mongoose').model('User')
const PassportLocalStrategy = require('passport-local').Strategy

/**
 * Return the passport local strategy
 */
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
      password: password.trim(),
      name: req.body.name.trim()
    }

    const newUser = new User(userData)
    newUser.save((err) => {
      console.log(err ? err : "User saved")
      return err ? done(err) : done(null)
    })
  }
)
