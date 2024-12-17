// import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState(0);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

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
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handlePlateChange = (e) => {
    setPlate(e.target.value);
  };
  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };
  const handleVehicleTypeChange = (e) => {
    setVehicleType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCaptainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicleInfo: {
        color,
        plate,
        vehicleType,
        capacity,
      },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptainData
      );
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        console.log(captain);
        localStorage.setItem("captain-token", data.token);

        navigate("/captain-home");
      }
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
      alert("Signup failed. Please try again.");
    }
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setCapacity("");
    setColor("");
    setPlate("");
    setVehicleType("");
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
          <h3 className="font-bold text-lg mb-2">
            What&apos;s your name captain
          </h3>
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
          <h3 className="font-bold text-lg mb-2">Vehicle Information</h3>
          <div className="flex gap-5 mb-2">
            <input
              className="w-1/2 border px-2 py-2 rounded  text-lg placeholder:text-sm"
              type="text"
              placeholder="vehicle color"
              name="password"
              value={color}
              onChange={(e) => {
                handleColorChange(e);
              }}
              required
            />

            <input
              className="w-1/2 border px-2 py-2 rounded  text-lg placeholder:text-sm"
              type="password"
              placeholder="plate nunber"
              name="password"
              value={plate}
              onChange={(e) => {
                handlePlateChange(e);
              }}
              required
            />
          </div>
          <div className="flex gap-5 mb-2">
            <input
              className="w-1/2 border px-2 py-2 rounded  text-lg placeholder:text-sm"
              type="password"
              placeholder="capacity"
              name="password"
              value={capacity}
              onChange={(e) => {
                handleCapacityChange(e);
              }}
              required
            />

            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => {
                handleVehicleTypeChange(e);
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <button className="bg-black text-white text-lg w-full rounded px-2 py-2 font-semibold mt-5">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already have a account{" "}
          <Link to="/captain-login" className="text-blue-400">
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

export default CaptainSignup;
