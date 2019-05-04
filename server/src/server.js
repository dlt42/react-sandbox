const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors')
const http = require("http")
const socketIo = require("socket.io")
const port = process.env.PORT || 4001
const index = require("./routes/index")
const record = require("./routes/record")
const app = express()
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())
app.use(record)
app.use(index)
const server = http.createServer(app)
const io = socketIo(server)

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    1000
  )
  socket.on("disconnect", () => console.log("Client disconnected"));
})

const getApiAndEmit = async socket => {
  try {
    socket.emit("FromAPI", Math.random())
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}
server.listen(port, () => console.log(`Listening on port ${port}`));