const { deleteRoom } = require("./util");

const connectSocket = io => {
  const totalUsers = {};

  const roomTimers = {};

  io.on("connection", socket => {
    socket.on("join-room", data => {
      const roomID = data.roomID;
      const userName = data.userName || "Guest User";
      const status = data.status;

      if (roomTimers[roomID]) {
        clearTimeout(roomTimers[roomID]);
        delete roomTimers[roomID];
      }

      if (totalUsers[roomID] === undefined) {
        totalUsers[roomID] = new Set();
        totalUsers[roomID].add({
          userName,
          id: socket.id,
          status,
        });
      } else {
        totalUsers[roomID].add({
          userName,
          id: socket.id,
          status,
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

    socket.on("room-editor-data", data => {
      const roomID = data.roomID;

      socket.broadcast.to(roomID).emit("editor-data", data);
    });

    socket.on("disconnect", () => {
      const id = socket.id;
      let found = false,
        roomID = null,
        userName = "",
        status = "";
      Object.keys(totalUsers).forEach(key => {
        found = false;
        for (const ele of totalUsers[key]) {
          if (ele.id === id) {
            userName = ele.userName;
            roomID = key;
            found = true;
            status = ele.status;
            totalUsers[key].delete(ele);
            break;
          }
        }
        if (found) {
          if (totalUsers[key].size == 0) {
            // if (status === "public") {
            //   // to be changed later
            //   const DELETETIMER = 5000;
            //   roomTimers[key] = setTimeout(function () {
            //     deleteRoom(roomID)
            //       .then(response => {
            //         if (response) {
            //           io.emit("room-delete", {
            //             roomID: key,
            //             error: false,
            //           });
            //         } else {
            //           io.emit("room-delete", {
            //             roomID: null,
            //             error: true,
            //           });
            //         }
            //       })
            //       .catch(error => {
            //         io.emit("room-delete", {
            //           roomID: null,
            //           error: true,
            //         });
            //       });
            //   }, DELETETIMER);
            // }

            delete totalUsers[key];
          }
          return;
        }
      });
      if (found && totalUsers[roomID] !== undefined) {
        socket.broadcast.to(roomID).emit("user-left", `${userName} left`);

        socket.to(roomID).emit("room-data", [...totalUsers[roomID]]);
      }
    });
  });
};

module.exports = connectSocket;
