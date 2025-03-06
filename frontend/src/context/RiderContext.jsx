import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const RiderDataContext = createContext();

const RiderContext = ({ children }) => {
  const [rider, setRider] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    phone: "",
    gender: "",
    dob: "",
    totalRides: 0,
  });

  // Function to update rider data
  const updateRider = (newData) => {
    setRider((prevRider) => ({
      ...prevRider,
      ...newData,
      fullname: {
        ...prevRider.fullname,
        ...(newData.fullname || {}),
      },
    }));
  };

  return (
    <RiderDataContext.Provider
      value={{
        rider,
        updateRider,
        setRider,
      }}
    >
      {children}
    </RiderDataContext.Provider>
  );
};

RiderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RiderContext;
