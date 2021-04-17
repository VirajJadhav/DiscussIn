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

const totalUsers = {};

io.on("connection", socket => {
  socket.on("join-room", data => {
    const roomID = data.roomID;
    const userName = data.userName || "Guest User";

    if (totalUsers[roomID] === undefined) {
      totalUsers[roomID] = new Set();
      totalUsers[roomID].add({
        userName,
        id: socket.id,
      });
    } else {
      totalUsers[roomID].add({
        userName,
        id: socket.id,
      });
    }

    socket.join(roomID);

    socket.emit("join-message", `Welcome, ${userName}`);

    socket.broadcast.to(roomID).emit("user-joined", `${userName} joined`);

    io.to(roomID).emit("room-data", [...totalUsers[roomID]]);
  });

  socket.on("room-chat-message", data => {
    const roomID = data.roomID;

    socket.broadcast.to(roomID).emit("chat-message", data);
  });

  socket.on("disconnect", () => {
    const id = socket.id;
    let found = false,
      roomID = null,
      userName = "";
    Object.keys(totalUsers).forEach(key => {
      found = false;
      if (totalUsers[key].size === 1) {
        found = true;
        delete totalUsers[key];
      } else {
        for (const ele of totalUsers[key]) {
          if (ele.id === id) {
            userName = ele.userName;
            roomID = key;
            found = true;
            totalUsers[key].delete(ele);
            break;
          }
        }
      }
      if (found) {
        return;
      }
    });
    if (found && totalUsers[roomID] !== undefined) {
      socket.broadcast.to(roomID).emit("user-left", `${userName} left`);

      socket.to(roomID).emit("room-data", [...totalUsers[roomID]]);
    }
  });
});
