import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RiderLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/riders/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        if (response.status === 200) {
          //   console.log(response);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error logging out:", error);
        // Optional: Handle error (e.g., show error message or redirect)
      }
    };

    logout();
  }, [navigate, token]); // Dependencies array ensures useEffect runs only when necessary

  return <div>Logging out...</div>;
};

export default RiderLogout;
