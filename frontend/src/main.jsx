import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RiderContext from "./context/RiderContext";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketContextProvider from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContext>
      <RiderContext>
        <SocketContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketContextProvider>
      </RiderContext>
    </CaptainContext>
  </StrictMode>
);
