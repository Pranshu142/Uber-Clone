// import React from 'react'
import { MapPinOff, MapPin, Coins } from "lucide-react";
import PropTypes from "prop-types";
import BallTriangle from "react-loading-icons/dist/esm/components/ball-triangle";

const WaitingCaptainPannel = ({ setWaitingCaptainPannel }) => {
  return (
    <div className="flex flex-col items-start gap-10 px-3 py-5">
      <div className="flex justify-between items-center gap-10 px-2 py-3">
        <h3 className="text-2xl font-bold">reaching to you in a while</h3>
        <BallTriangle
          fill="black"
          fillOpacity={1}
          stroke="gray"
          strokeOpacity={0.7}
          speed={1}
          className="h-10 w-10"
        />
      </div>
      <div className="relative w-full flex justify-end items-center px-2 py-11 rounded-2xl bg-gray-100 shadow-md shadow-gray-200">
        <div className="rounded-full h-24 w-24 absolute left-5 overflow-hidden z-10 bg-gray-200 ">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/032/507/395/small/3d-character-taxi-driver-giving-a-thumb-up-pose-3d-render-isolated-on-transparent-backdrop-png.png"
            className="object-cover h-full w-full object-center"
          />
        </div>
        <div className="rounded-full h-24 w-24 absolute left-20 overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTslYkc4PUEBbjx98XiTBQ2uLUJBW6TGiHxrQ&s"
            className="object-cover h-full w-full object-center"
          />
        </div>
        <div className="flex flex-col text-end items-center gap-1 w-[50%]">
          <h3 className="w-full font-semibold text-md">captain name</h3>
          <h3 className="w-full font-semibold text-md">captain vehicle no.</h3>
          <h3 className="w-full font-semibold text-md">captain vehicle name</h3>
        </div>
      </div>
      <div className="flex flex-col w-full gap-5">
        <button className="flex justify-start items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-5 active:border-3 active:border-black w-full text-left">
          <MapPinOff className="h-5 w-5" />
          <h3 className="text-lg font-semibold">
            1600 Amphitheatre Parkway, Bengaluru, Karnataka
          </h3>
        </button>

        <button className="flex justify-start items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-5 active:border-3 active:border-black  w-full text-left">
          <MapPin className="h-5 w-5" />
          <h3 className="text-lg font-semibold">
            1600 Amphitheatre Parkway, Bengaluru, Karnataka
          </h3>
        </button>

        <button className="flex justify-start items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-5 active:border-3 active:border-black w-full text-left">
          <Coins className="h-5 w-5" />
          <h3 className="text-lg font-semibold">₹60</h3>
        </button>
        <button
          className="bg-red-400 hover:bg-green-500 px-3 py-5 w-full rounded-full mt-5 text-2xl font-bold active:border-3 active:border-black transition-all duration-200 "
          onClick={() => {
            setWaitingCaptainPannel(false);
          }}
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
};
WaitingCaptainPannel.propTypes = {
  setWaitingCaptainPannel: PropTypes.func.isRequired,
};

export default WaitingCaptainPannel;
