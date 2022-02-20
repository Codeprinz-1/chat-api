const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      errors: "username and room are required",
    };
  }

  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: " Username is in use",
    };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

console.log(
  addUser({
    id: 22,
    username: "Prince",
    room: "South Nigeria",
  })
);

addUser({
  id: 22,
  username: "Prince",
  room: "South Nigeria",
});

const getUser = (id) => {
  return users.find((user) => user.id === id);
};
console.log(removeUser(22));
console.log(users);
