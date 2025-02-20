import { useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
export const SocketContext = createContext();

// base url for the socket connection to the server side of the application
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
const socket = io(baseUrl);

const SocketContextProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketContextProvider;
