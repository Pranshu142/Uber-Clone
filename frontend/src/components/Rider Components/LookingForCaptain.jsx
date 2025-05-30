// import React from 'react'
import Rings from "react-loading-icons/dist/esm/components/rings";
import { Coins, MapPin, MapPinOff } from "lucide-react";
import PropTypes from "prop-types";

const LookingForCaptain = ({
  setLookingForCaptainPannel,
  startPoint,
  endPoint,
  confirmRideImage,
  fare,
}) => {
  return (
    <div className="flex flex-col justify-start px-4 py-5 gap-5">
      <div className="flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold mt-2 text-center">
          Looking For Captain near you
        </h2>
        <Rings stroke="green" strokeOpacity={1} speed={0.65} className="mt-3" />
      </div>

      <div className="flex justify-center items-center mt-5 bg-gray-100 rounded-2xl py-3 shadow-md shadow-gray-400">
        <img
          src={confirmRideImage}
          alt="Uber Moto"
          className="h-28 w-28 sm:h-36 sm:w-32 object-center object-cover"
        />
      </div>

      <div className="flex flex-col w-full gap-4">
        <button className="flex justify-start items-center gap-3 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left">
          <MapPinOff className="h-6 w-6 text-gray-700" />
          <h3 className="text-md sm:text-lg font-semibold">{startPoint}</h3>
        </button>

        <button className="flex justify-start items-center gap-3 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left">
          <MapPin className="h-6 w-6 text-gray-700" />
          <h3 className="text-md sm:text-lg font-semibold">{endPoint}</h3>
        </button>

        <button className="flex justify-start items-center gap-3 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left">
          <Coins className="h-6 w-6 text-gray-700" />
          <h3 className="text-md sm:text-lg font-semibold">{fare}</h3>
        </button>
      </div>

      <button
        className="bg-red-500 hover:bg-red-600 px-3 py-4 w-full rounded-full mt-5 text-lg sm:text-xl font-bold active:border-2 active:border-black transition-all duration-200"
        onClick={() => {
          setLookingForCaptainPannel(false);
        }}
      >
        Cancel Ride
      </button>
    </div>
  );
};

LookingForCaptain.propTypes = {
  setLookingForCaptainPannel: PropTypes.func.isRequired,
  endPoint: PropTypes.string.isRequired,
  startPoint: PropTypes.string.isRequired,
  confirmRideImage: PropTypes.string.isRequired,
  fare: PropTypes.number.isRequired,
};

export default LookingForCaptain;
