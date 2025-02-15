import app from "./app.js"; // Ensure relative path to `app.js` file
import http from "http";
import Socket from "./socket.js"; // Import the `initializeSocket` function

const port = process.env.PORT || 3000;

const server = http.createServer(app); // Pass the app instance directly

Socket.initializeSocket(server); // Pass the server instance to the `initializeSocket` function

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
