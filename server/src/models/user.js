const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { 
    	unique: true
    }
  },
  password: String,
  name: String
})

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback)
}

// Executes before a user is saved
UserSchema.pre('save', function(next) {
  const user = this

  // Continue only if the password has been modified or the user is new
  if (!user.isModified('password')) {
  	return next()
  }

  // Don't save the raw password...
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { 
    	return next(saltError)
    }

    // ...convert the password to a hash
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { 
        return next(hashError)
      }

      // Replace the password with the hash
      user.password = hash

      // Continue to save the user with the hashed password
      return next()
    })
  })
})


module.exports = mongoose.model('User', UserSchema);