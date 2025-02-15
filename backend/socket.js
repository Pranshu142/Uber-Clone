import { Server } from "socket.io";
import riderModel from "./models/rider.models.js";
import captainModel from "./models/captain.models.js";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected with socket id ${socket.id}`);

    socket.on("join", async (data) => {
      try {
        const { userType, userId } = data;
        if (userType === "rider") {
          await riderModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (error) {
        console.error("Error in join event:", error);
      }
    });

    socket.on("update-captain-location", async (data) => {
      try {
        const { userId, location } = data;

        // Update to use GeoJSON Point format
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [location.longitude, location.latitude], // MongoDB expects [longitude, latitude]
          },
        });
      } catch (error) {
        console.error("Error updating captain location:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

const sendMessage = (socketId, event, message) => {
  if (io) {
    io.to(socketId).emit(event, message);
  } else {
    console.error("Socket.io is not initialized");
  }
};

export default {
  initializeSocket,
  sendMessage,
};
