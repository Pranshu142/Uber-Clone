import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiderDataContext } from "../../context/RiderContext.jsx";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setRider } = useContext(RiderDataContext);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
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

        setRider(data.rider);
        // setTimeout(() => console.log(rider), 10000);
        localStorage.setItem("token", data.token);
        navigate("/rider-home");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      alert("Login failed. Please try again.");
    }
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

        {/* Login Form */}
        <form onSubmit={submitHandler}>
          <h3 className="font-bold text-lg mb-3">What&apos;s your email?</h3>
          <input
            className="w-full border px-3 py-2 rounded-lg mb-5 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            placeholder="email@example.com"
            aria-label="Email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
            required
          />

          <h3 className="font-bold text-lg mb-3">Enter your password</h3>
          <input
            className="w-full border px-3 py-2 rounded-lg mb-5 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            placeholder="Enter your password"
            aria-label="Password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            required
          />

          <button
            type="submit"
            className="bg-black text-white text-lg w-full rounded-lg px-4 py-3 font-semibold hover:bg-gray-800 transition-all"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline transition-all"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Captain Login */}
      <Link
        to="/captain-login"
        className="bg-purple-500 text-white text-lg w-full max-w-md rounded-lg px-4 py-3 font-semibold mt-5 hover:bg-purple-600 transition-all"
      >
        Login as Captain
      </Link>
    </div>
  );
};

export default UserLogin;
