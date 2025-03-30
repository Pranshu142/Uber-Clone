import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

// Create context with a meaningful default value
const RiderDataContext = createContext({
  rider: null,
  setRider: () => {},
  updateRider: () => {},
});

const RiderContext = ({ children }) => {
  // Initialize state from localStorage with error handling
  const [rider, setRider] = useState(() => {
    try {
      const savedRider = localStorage.getItem("rider-data");
      return savedRider ? JSON.parse(savedRider) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  });

  // Persist rider data to localStorage
  useEffect(() => {
    if (rider) {
      try {
        localStorage.setItem("rider-data", JSON.stringify(rider));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [rider]);

  // Update rider data with proper structure maintenance
  const updateRider = (newData) => {
    setRider((prevRider) => {
      const updatedRider = {
        ...prevRider,
        ...newData,
        fullname: {
          ...prevRider?.fullname,
          ...(newData?.fullname || {}),
        },
      };
      try {
        localStorage.setItem("rider-data", JSON.stringify(updatedRider));
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
      return updatedRider;
    });
  };

  const contextValue = {
    rider,
    setRider,
    updateRider,
  };

  return (
    <RiderDataContext.Provider value={contextValue}>
      {children}
    </RiderDataContext.Provider>
  );
};

RiderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RiderDataContext };
export default RiderContext;
