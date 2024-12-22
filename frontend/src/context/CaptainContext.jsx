import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};
CaptainContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaptainContext;
