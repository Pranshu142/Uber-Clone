import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CaptainDataContext = createContext();

/**
 * A context provider component for managing captain data throughout the application.
 * @component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components that will have access to the captain context
 * @returns {JSX.Element} A context provider wrapping the children with captain data state
 */

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
