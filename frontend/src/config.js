import io from "socket.io-client";

const socketIO = io(`http://localhost:5000/`);

global.config = {
  backendURL: `http://localhost:5000/api`,
  socketIO,
};

export default global.config;
