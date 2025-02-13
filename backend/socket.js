import socketIO from "socket.io";

let io;

const initializeSocket = (server) => {
  io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

const sendMessage = (event, message) => {
  if (io) {
    io.emit(event, message);
  } else {
    console.error("Socket.io is not initialized");
  }
};

export default {
  initializeSocket,
  sendMessage,
};
