const express = require("express")
const router = express.Router()
const cors = require('cors')

// For development allow cross origin resource sharing globally
// This allows the client to access both the front end server and the back end server
// TODO: Configure CORS sensibly
router.all('*', cors())

// If the root is accessed then return a simple status message
router.get("/", (req, res) => {
  res.send({ response: "Server running" }).status(200)
})

module.exports = router