const express = require("express");

const app = express();
const port = 3002;

const publicDirectoryPath = path.join((__dirname, "../public"));

app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
  console.log("Listening on port " + port);
});
