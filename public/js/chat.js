const socket = io();

socket.on("connect", (data) => {
  console.log(data);
});

const send = function () {
  const text = document.getElementById("message").value;
  if (text) {
    socket.emit("message", text);
  }
};
