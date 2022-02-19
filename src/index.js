const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3002;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("user-connect", "welcome to our application");

  socket.on("send-message", (message) => {
    socket.emit("message", () => {
      console.log("something");
    });
    console.log(message);
    // socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    io.emit("message", "User disconnected");
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});
