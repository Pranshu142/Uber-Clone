import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userData, setUserData] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
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
          <h3 className="font-bold text-lg mb-2">What&apos;s your name</h3>
          <div className="flex gap-5 mb-2">
            <input
              className="w-1/2 border px-2 py-2 rounded  text-lg placeholder:text-sm"
              type="text"
              placeholder="First Name"
              name="First Name"
              value={firstname}
              onChange={handleFirstnameChange}
              required
            />
            <input
              className="w-1/2 border px-2 py-2 rounded text-lg placeholder:text-sm"
              type="text"
              placeholder="Last Name"
              name="Last Name"
              value={lastname}
              onChange={handleLastnameChange}
              required
            />
          </div>

          <h3 className="font-bold text-lg mb-2">Enter your email</h3>
          <input
            className="w-full border px-2 py-2 rounded mb-2 text-lg placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <h3 className="font-bold text-lg mb-2">Enter your password</h3>
          <input
            className="w-full border px-2 py-2 rounded mb-2 text-lg placeholder:text-sm"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button className="bg-black text-white text-lg w-full rounded px-2 py-2 font-semibold mt-5">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have a account{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
      <p className="text-justify font-light text-sm mt-3 ">
        By proceeding, you consent to get calls, WhatsApp or SMS messages,
        including by automated dialer, from Uber and its affiliates to the
        number provided. Text &quot;STOP&quot; to 89203 to opt out.
      </p>
    </div>
  );
};

export default UserSignup;
