const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/database");
// require("dotenv").config();

const PORT = process.env.PORT || 5000;

const routes = ["auth", "room", "user"];

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

io.on("connection", socket => {
  socket.on("join-room", data => {
    const roomID = data.roomID;

    socket.join(roomID);

    socket.emit("join-message", "Welcome to Discuss In");

    socket.broadcast.to(roomID).emit("user-joined", "A user joined !");

    // socket.to(roomID).emit("room-data", "data");
  });

  socket.on("room-chat-message", data => {
    const roomID = data.roomID;

    socket.broadcast.to(roomID).emit("chat-message", data);
  });

  // socket.on("disconnect", () => {});
});
