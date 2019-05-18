const mongoose = require('mongoose')

module.exports.connect = (uri) => {

	// Connect mongoose using the passed URI
  mongoose.connect(uri)

  // Add the promise library
  mongoose.Promise = global.Promise

	// Log connection errors to the console
  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`)
    process.exit(1)
  })

  // Load the models
  require('./user')
}