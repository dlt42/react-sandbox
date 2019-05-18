const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config')
const cors = require('cors')
const http = require("http")
const socketIo = require("socket.io")

// Connect to the database and load models
require('./models').connect(config.database);

const app = express();

// Enable CORS globally
app.use(cors())
app.options('*', cors())

// Configure the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Pass the passport middleware
app.use(passport.initialize());

// Load passport strategies
passport.use('local-signup', require('./passport/local-signup'))
passport.use('local-login', require('./passport/local-login'))

// Pass the authenticaion check middleware
app.use('*', require('./middleware/auth-checks'))

// Set up routes
app.use(require("./routes/auth"))
app.use(require("./routes/record"))
app.use(require("./routes/index"))

// Prepare websockets 
const server = http.createServer(app)
const io = socketIo(server)

// Handle a websocket connection
io.on("connection", socket => {
  console.log("Client connected")

  // At regular intervals send a random number to the client - just for testing at present
  setInterval(() => emitRandom(socket), 1000)
  socket.on("disconnect", () => console.log("Client disconnected"))
})

const emitRandom = async socket => {
  try {
    socket.emit("FromAPI", Math.random())
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}

// Specify the port
var port = process.env.PORT || 4001

// Launch the server
server.listen(port, () => console.log(`Listening on port ${port}`))