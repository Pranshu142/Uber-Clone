import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create context with a meaningful default value
export const CaptainDataContext = createContext({
  captain: null,
  setCaptain: () => {},
  updateCaptain: () => {},
});

const CaptainContext = ({ children }) => {
  // Initialize state from localStorage with error handling
  const [captain, setCaptain] = useState(() => {
    try {
      const savedCaptain = localStorage.getItem("captain-data");
      return savedCaptain ? JSON.parse(savedCaptain) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  });

  // Persist captain data to localStorage
  useEffect(() => {
    if (captain) {
      try {
        localStorage.setItem("captain-data", JSON.stringify(captain));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [captain]);

  // Update captain data with proper structure maintenance
  const updateCaptain = (newData) => {
    setCaptain((prevCaptain) => {
      const updatedCaptain = {
        ...prevCaptain,
        ...newData,
        fullname: {
          ...prevCaptain?.fullname,
          ...(newData?.fullname || {}),
        },
      };
      try {
        localStorage.setItem("captain-data", JSON.stringify(updatedCaptain));
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
      return updatedCaptain;
    });
  };

  const contextValue = {
    captain,
    setCaptain,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={contextValue}>
      {children}
    </CaptainDataContext.Provider>
  );
};

CaptainContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaptainContext;
