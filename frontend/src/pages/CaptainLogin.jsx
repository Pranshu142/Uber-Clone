/**
 * @file CaptainLogin.jsx
 * @description Component handling the login functionality for Uber captains/drivers
 */

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";

/**
 * CaptainLogin Component
 * Renders a login form for captains with email and password authentication
 * @returns {JSX.Element} The captain login form interface
 */
const CaptainLogin = () => {
  // State management for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  /**
   * Handles email input changes
   * @param {Object} e - Event object
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Handles password input changes
   * @param {Object} e - Event object
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handles form submission and captain authentication
   * @param {Object} e - Event object
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    try {
      // Attempt authentication with backend
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      );

      if (response.status === 200) {
        const data = response.data;
        // Store captain data in context and token in localStorage
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
      {/* Logo section */}
      <div>
        <img
          className="w-14 ml-5 mb-5"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s"
          alt="Uber logo"
        />
        {/* Login form */}
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
        {/* Registration link */}
        <p className="text-center">
          Want to join?{" "}
          <Link to="/captain-signup" className="text-blue-500">
            Register as a captain
          </Link>
        </p>
      </div>
      {/* Rider login redirect button */}
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
