// import React from "react";
import PropTypes from "prop-types";

const LocationSearchPanel = ({ setPannelOpen, setRideTypePannelOpen }) => {
  const location = [
    "221B Baker Street, Mumbai, Maharashtra",
    "10 Downing Street, New Delhi, Delhi",
    "1600 Amphitheatre Parkway, Bengaluru, Karnataka",
    "742 Evergreen Terrace, Chennai, Tamil Nadu",
    "4 Privet Drive, Kolkata, West Bengal",
    "12 Grimmauld Place, Hyderabad, Telangana",
    "1313 Mockingbird Lane, Pune, Maharashtra",
    "42 Wallaby Way, Ahmedabad, Gujarat",
    "123 Sesame Street, Jaipur, Rajasthan",
    "555 California Street, Lucknow, Uttar Pradesh",
  ];
  return (
    <div className="flex flex-col justify-around gap-5 items-center w-full">
      {location.map((item, index) => (
        <div
          key={index}
          className="w-full justify-start flex items-center gap-2 py-3 bg-gray-100 border-black active:border-2 rounded-lg px-2"
          onClick={() => {
            setPannelOpen(false);
            setRideTypePannelOpen(true);
          }}
        >
          <i className="ri-map-pin-fill bg-gray-300  rounded-lg px-2 py-1 "></i>
          <div className="text-md font-medium   "> {item}</div>
        </div>
      ))}
    </div>
  );
};
LocationSearchPanel.propTypes = {
  setPannelOpen: PropTypes.func.isRequired,
  setRideTypePannelOpen: PropTypes.func.isRequired,
};

export default LocationSearchPanel;
