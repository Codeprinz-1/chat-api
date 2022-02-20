const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const { generateMessage } = require("./utils/message.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3002;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("user-connect", "welcome to our application");

  socket.on("send-message", (message, callback) => {
    callback();
    socket.broadcast.emit("message", generateMessage(message));
  });

  socket.on("join", ({ username, room }) => {
    socket.join(room);
  });

  socket.on("disconnect", () => {
    io.emit("message", "User disconnected");
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

addUser({
  id: 22,
  username: "Prince",
  room: "South Nigeria",
});
