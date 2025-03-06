import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const RiderDataContext = createContext();

const RiderContext = ({ children }) => {
  const [rider, setRider] = useState(null);

  // Function to update rider data
  // const updateRider = (newData) => {
  //   setRider((prevRider) => {
  //     const updatedFullname = {
  //       ...prevRider?.fullname,
  //       ...(newData.fullname || {}),
  //     };

  //     if (newData.firstname) updatedFullname.firstname = newData.firstname;
  //     if (newData.lastname) updatedFullname.lastname = newData.lastname;

  //     return {
  //       ...prevRider,
  //       ...newData,
  //       fullname: updatedFullname,
  //     };
  //   });
  // };

  return (
    <RiderDataContext.Provider
      value={{
        rider,
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
