import app from "./app.js"; // Ensure relative path to `app.js` file
import http from "http";

const port = process.env.PORT || 3000;

const server = http.createServer(app); // Pass the app instance directly

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
