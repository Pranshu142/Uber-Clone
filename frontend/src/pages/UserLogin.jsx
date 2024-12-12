// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    console.log(userData);
  };
  return (
    <div className="p-7 flex flex-col justify-between items-center h-screen">
      <div>
        <img
          className="w-14 ml-5 mb-5"
          src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
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
          New here?{" "}
          <Link to="/signup" className="text-blue-400">
            Create an account
          </Link>
        </p>
      </div>
      <Link
        to="/captainLogin"
        className="bg-purple-500 flex justify-center items-center text-white text-lg w-full rounded px-2 py-2 font-semibold mb-2"
      >
        Login in as Captain
      </Link>
    </div>
  );
};

export default UserLogin;
