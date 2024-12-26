import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiderDataContext } from "../context/RiderContext.jsx";

const RiderSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { setRider } = useContext(RiderDataContext);
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/riders/register`,
        newUser,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const data = response.data;
        setRider(data.rider);
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

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  return (
    <div className="p-7 flex flex-col justify-between items-center h-screen bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <img
          className="w-14 mx-auto mb-5"
          src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
          alt="Uber logo"
        />

        {/* Signup Form */}
        <form onSubmit={submitHandler}>
          <h3 className="font-bold text-lg mb-3">What&apos;s your name?</h3>
          <div className="flex gap-3 mb-4">
            <input
              className="w-1/2 border px-3 py-2 rounded-lg text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => handleInputChange(e, setFirstname)}
              required
            />
            <input
              className="w-1/2 border px-3 py-2 rounded-lg text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => handleInputChange(e, setLastname)}
              required
            />
          </div>

          <h3 className="font-bold text-lg mb-3">Enter your email</h3>
          <input
            className="w-full border px-3 py-2 rounded-lg mb-4 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
            required
          />

          <h3 className="font-bold text-lg mb-3">Enter your password</h3>
          <input
            className="w-full border px-3 py-2 rounded-lg mb-4 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            required
          />

          <button
            type="submit"
            className="bg-black text-white text-lg w-full rounded-lg px-4 py-3 font-semibold hover:bg-gray-800 transition-all"
          >
            Create Account
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-center font-light text-xs mt-3 px-5">
        By proceeding, you consent to get calls, WhatsApp, or SMS messages,
        including by automated dialer, from Uber and its affiliates to the
        number provided. Text &quot;STOP&quot; to 89203 to opt-out.
      </p>
    </div>
  );
};

export default RiderSignup;
