const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const { generateMessage } = require("./utils/message.js");
const { addUser, removeUser } = require("./utils/users.js");

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

  socket.on("join", (options, callback) => {
    const { error, users } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }
    socket.join(room);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);

    io.emit("message", generateMessage(" A user has disconnected"));
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});
