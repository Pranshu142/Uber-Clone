import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import React  from "react";
const CaptainLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("captain-token");
  console.log("🚀 ~ CaptainLogout ~ token:", token);

  useEffect(() => {
    const logout = async () => {
      try {
        await axios
          .post(
            `${import.meta.env.VITE_BASE_URL}/captains/logout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              localStorage.removeItem("captain-token");
              navigate("/captain-login");
            }
          });
      } catch (e) {
        console.error(e);
        alert("Error while logging out");
      }
    };
    logout();
  }, [navigate, token]);
  return <div></div>;
};

export default CaptainLogout;
