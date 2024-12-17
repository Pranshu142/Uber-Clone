import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

const CaptainProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("captain-token");
  const { setCaptain } = useContext(CaptainDataContext);
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

  const handleLogOut = () => {
    localStorage.removeItem("captain-token");
    navigate("/captain-login");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return <>{children}</>;
};

export default CaptainProtectedRoutes;
