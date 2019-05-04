const express = require("express")
const router = express.Router()
const cors = require('cors')

router.all('*', cors())

router.get("/", (req, res) => {
  res.send({ response: "Server running" }).status(200)
})

module.exports = router