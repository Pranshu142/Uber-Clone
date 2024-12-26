import React, { useState } from "react";
import PropTypes from "prop-types";

export const RiderDataContext = React.createContext();

const RiderContext = ({ children }) => {
  const [rider, setRider] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });

  return (
    <RiderDataContext.Provider value={{ rider, setRider }}>
      {children}
    </RiderDataContext.Provider>
  );
};
RiderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RiderContext;
