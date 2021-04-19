const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/database");
const connectSocket = require("./socket");
// require("dotenv").config();

const PORT = process.env.PORT || 5000;

const routes = ["auth", "room", "user", "message"];

const app = express();

(async function () {
  await connectDatabase();
})();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

routes.forEach(route => {
  app.use(`/api/${route}`, require(`./routes/${route}`));
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

connectSocket(io);
