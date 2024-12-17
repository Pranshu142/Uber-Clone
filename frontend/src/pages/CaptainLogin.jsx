// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";

// import
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      );
      if (response.status === 200) {
        const data = response.data;
        // console.log("🚀 ~ handleSubmit ~ data:", data, data.token);
        setCaptain(data.captain);
        localStorage.setItem("captain-token", data.token);
        navigate("/captain-home");
      }
    } catch (e) {
      console.error(e);
      alert("Error: " + e.message);
    }
  };

  return (
    <div className="p-7 flex flex-col justify-between items-center h-screen">
      <div>
        <img
          className="w-14 ml-5 mb-5"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s"
          alt="Uber logo"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-2">What&apos;s your email</h3>
          <input
            className="w-full border px-2 py-2 rounded mb-7 text-lg placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <h3 className="font-bold text-lg mb-2">Enter your password</h3>
          <input
            className="w-full border px-2 py-2 rounded mb-7 text-lg placeholder:text-sm"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button className="bg-black text-white text-lg w-full rounded px-2 py-2 font-semibold">
            Login
          </button>
        </form>
        <p className="text-center">
          Want to join?{" "}
          <Link to="/captain-signup" className="text-blue-500">
            Register as a captain
          </Link>
        </p>
      </div>
      <Link
        to="/login"
        className="bg-blue-500 flex justify-center items-center text-white text-lg w-full rounded px-2 py-2 font-semibold mb-2"
      >
        Login in as Rider
      </Link>
    </div>
  );
};

export default CaptainLogin;
