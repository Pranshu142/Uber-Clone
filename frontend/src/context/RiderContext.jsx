import React, { useState } from "react";

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

export default RiderContext;
