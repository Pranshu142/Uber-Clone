import { useNavigate } from "react-router-dom";
import { RiderDataContext } from "../context/RiderContext.jsx";
import axios from "axios";
import { useContext, useEffect } from "react";
import PropTypes from "prop-types";

const RiderProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setRider } = useContext(RiderDataContext);

  useEffect(() => {
    // Redirect to login if no token is found
    if (!token) {
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const { status, data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/riders/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (status === 200 && data.rider) {
          setRider(data.rider); // Update rider context
          console.log("Verified Rider:", data.rider);
        } else {
          console.warn("Invalid rider data. Redirecting to login.");
          handleLogout();
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
        handleLogout();
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

    verifyToken();
  }, [token, navigate, setRider]);

  // Show loading indicator if rider verification is ongoing
  return token ? <>{children}</> : <div>Loading...</div>;
};
RiderProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RiderProtectedRoutes;
