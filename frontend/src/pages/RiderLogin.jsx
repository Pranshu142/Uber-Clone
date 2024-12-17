import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiderDataContext } from "../context/RiderContext.jsx";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { rider, setRider } = React.useContext(RiderDataContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const riderData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/riders/login`,
        riderData
      );
      if (response.status === 200) {
        const data = response.data;
        // console.log(data.rider.fullname.firstname);
        setRider(data.rider);
        // console.log(rider);
        localStorage.setItem("token", data.token);
        navigate("/rider-home");
      }
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="p-7 flex flex-col justify-between items-center h-screen">
      <div>
        <img
          className="w-14 ml-5 mb-5"
          src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
          alt="Uber logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
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
          <button
            type="submit"
            className="bg-black text-white text-lg w-full rounded px-2 py-2 font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-400">
            Create an account
          </Link>
        </p>
      </div>
      <Link
        to="/captain-login"
        className="bg-purple-500 flex justify-center items-center text-white text-lg w-full rounded px-2 py-2 font-semibold mb-2"
      >
        Login in as Captain
      </Link>
    </div>
  );
};

export default UserLogin;
