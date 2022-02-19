const socket = io();

socket.on("user-connect", (data) => {
  console.log(data);
});

socket.on("message", (data) => {
  console.log(data);
});

const send = function (e, target) {
  e.preventDefault();

  const text = target.elements.message.value;
  if (text) {
    socket.emit("send-message", text);
  }
};
