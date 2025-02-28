import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component for handling captain logout functionality
/**
 * Component handling the logout process for captains.
 * Makes a POST request to logout endpoint with authorization token.
 * On successful logout, removes captain's token from localStorage and redirects to login page.
 *
 * @component
 * @requires react-router-dom - For navigation functionality
 * @requires axios - For making HTTP requests
 * @returns {JSX.Element} An empty div element
 */
const CaptainLogout = () => {
  // Initialize navigation function from react-router
  const navigate = useNavigate();

  // Get captain's authentication token from localStorage
  const token = localStorage.getItem("captain-token");
  console.log("🚀 ~ CaptainLogout ~ token:", token);

  useEffect(() => {
    // Define async function to handle logout process
    const logout = async () => {
      try {
        // Make POST request to logout endpoint
        await axios
          .post(
            `${import.meta.env.VITE_BASE_URL}/captains/logout`,
            {}, // Empty body
            {
              headers: {
                // Include authentication token in request header
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            // If logout successful (status 200)
            if (response.status === 200) {
              // Remove captain's token from localStorage
              localStorage.removeItem("captain-token");
              // Redirect to login page
              navigate("/captain-login");
            }
          });
      } catch (e) {
        // Handle any errors during logout
        console.error(e);
        alert("Error while logging out");
      }
    };
    // Execute logout function when component mounts
    logout();
  }, [navigate, token]); // Dependencies for useEffect

  // Render empty div (component doesn't need UI)
  return <div></div>;
};

export default CaptainLogout;
