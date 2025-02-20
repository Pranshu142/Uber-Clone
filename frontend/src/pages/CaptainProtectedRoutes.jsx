import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

/**
 * A protected route component for captain authentication.
 * Verifies the captain's token and manages access to protected routes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @returns {JSX.Element} Protected route wrapper component
 * @throws {Error} When token verification fails
 *
 * @example
 * <CaptainProtectedRoutes>
 *   <ProtectedComponent />
 * </CaptainProtectedRoutes>
 */
const CaptainProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("captain-token");
  const { setCaptain } = useContext(CaptainDataContext);
  // State to manage loading state of the component while verifying the token validity
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      handleLogOut();
      return;
    }

    const verifyToken = async () => {
      try {
        const { status, data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (status === 200 && data.captain) {
          setCaptain(data.captain); // Save captain details to context
        } else {
          console.error("Invalid response or missing captain data.");
          handleLogOut();
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
        handleLogOut();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token, navigate, setCaptain]);

  // ----------------------------------------------------------------
  // Function to handle captain logout whenver the authentication is not successful or the token is invalid or expired
  // ----------------------------------------------------------------
  const handleLogOut = () => {
    localStorage.removeItem("captain-token");
    navigate("/captain-login");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return <>{children}</>;
};
CaptainProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaptainProtectedRoutes;
