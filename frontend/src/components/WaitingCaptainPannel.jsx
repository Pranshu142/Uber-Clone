// import React from 'react'
import { MapPinOff, MapPin, Coins } from "lucide-react";
import PropTypes from "prop-types";
import BallTriangle from "react-loading-icons/dist/esm/components/ball-triangle";

const WaitingCaptainPannel = ({
  setWaitingCaptainPanel,
  startPoint,
  endPoint,
  confirmRideImage,
  fare,
  captainAssigned,
}) => {
  console.log(confirmRideImage);
  return (
    <div className="flex flex-col items-start gap-8 px-4 py-5">
      {/* Heading and Loading Indicator */}

      <div className="flex flex-col justify-between items-center gap-10 w-full">
        <div className="flex justify-between items-center gap-4 w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-center">
            Reaching to you in a while
          </h3>
          <BallTriangle
            fill="black"
            fillOpacity={1}
            stroke="gray"
            strokeOpacity={0.7}
            speed={1}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
        </div>
        <div className="flex justify-between items-center gap-4 w-full">
          <h1 className="inline font-bold text-lg">OTP</h1>
          <h1 className="inline font-bold text-lg">Some value</h1>
        </div>
      </div>
      {/* Captain Details */}
      <div className="relative w-full flex justify-end items-center px-4 py-8 rounded-2xl bg-gray-100 shadow-md shadow-gray-200">
        <div className="rounded-full h-20 w-20 sm:h-24 sm:w-24 absolute left-4 sm:left-5 overflow-hidden z-10 bg-gray-200">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/032/507/395/small/3d-character-taxi-driver-giving-a-thumb-up-pose-3d-render-isolated-on-transparent-backdrop-png.png"
            alt="Captain"
            className="object-cover h-full w-full object-center"
          />
        </div>
        <div className="rounded-full h-20 w-20 sm:h-24 sm:w-24 absolute left-16 sm:left-20 overflow-hidden">
          <img
            src={
              confirmRideImage === ""
                ? "https://static.vecteezy.com/system/resources/thumbnails/032/507/395/small/3d-character-taxi-driver-giving-a-thumb-up-pose-3d-render-isolated-on-transparent-backdrop-png.png"
                : confirmRideImage
            }
            alt="Vehicle"
            className="object-cover h-full w-full object-center"
          />
        </div>
        <div className="flex flex-col text-right items-center gap-1 w-[50%]">
          <h3 className="w-full font-semibold text-sm sm:text-md">
            {`${captainAssigned.fullname.firstname} ${captainAssigned.fullname.lastname}`}
          </h3>
          <h3 className="w-full font-semibold text-sm sm:text-md">
            {captainAssigned.vehicleInfo.plate}
          </h3>
          <h3 className="w-full font-semibold text-sm sm:text-md">
            {captainAssigned.vehicleInfo.vehicleType}
          </h3>
        </div>
      </div>

      {/* Location and Ride Info */}
      <div className="flex flex-col w-full gap-4">
        <button className="flex justify-start items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 sm:py-5 active:border-2 active:border-black w-full text-left">
          <MapPinOff className="h-5 w-5" />
          <h3 className="text-sm sm:text-lg font-semibold">{startPoint}</h3>
        </button>

        <button className="flex justify-start items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 sm:py-5 active:border-2 active:border-black w-full text-left">
          <MapPin className="h-5 w-5" />
          <h3 className="text-sm sm:text-lg font-semibold">{endPoint}</h3>
        </button>

        <button className="flex justify-start items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 sm:py-5 active:border-2 active:border-black w-full text-left">
          <Coins className="h-5 w-5" />
          <h3 className="text-sm sm:text-lg font-semibold">{fare}</h3>
        </button>
      </div>

      {/* Cancel Ride Button */}
      <button
        className="bg-red-500 hover:bg-red-600 px-3 py-4 sm:py-5 w-full rounded-full mt-5 text-lg sm:text-xl font-bold active:border-2 active:border-black transition-all duration-200"
        onClick={() => {
          setWaitingCaptainPanel(false);
        }}
      >
        Cancel Ride
      </button>
    </div>
  );
};

WaitingCaptainPannel.propTypes = {
  setWaitingCaptainPanel: PropTypes.func.isRequired,
  endPoint: PropTypes.string.isRequired,
  startPoint: PropTypes.string.isRequired,
  confirmRideImage: PropTypes.string.isRequired,
  fare: PropTypes.number.isRequired,
  captainAssigned: PropTypes.shape({
    fullname: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }).isRequired,
    vehicleInfo: PropTypes.shape({
      plate: PropTypes.string.isRequired,
      vehicleType: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WaitingCaptainPannel;
