// import React from 'react'

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import CaptainLogoutButton from "../components/CaptainLogoutButton";
import { useEffect, useState, useRef } from "react";
import { Coins, MapPin, MapPinOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};
const CaptainRidingStart = () => {
  const completeRideRef = useRef(null);
  const [completeRidePanelOpen, setCompleteRidePanelOpen] = useState(false);

  useGSAP(() => {
    if (completeRidePanelOpen) {
      gsap.to(completeRideRef.current, {
        transform: "translateY(0)",
        duration: 0.4,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(completeRideRef.current, {
        transform: "translateY(100%)",
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [completeRidePanelOpen]);

  return (
    <div className="h-screen w-screen relative">
      <div>
        <CaptainLogoutButton />
      </div>
      <div className="h-full w-full">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={16}
          scrollWheelZoom={true}
          className="h-screen w-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>

      <div className="absolute bg-yellow-100 h-1/5  z-[1001] w-full bottom-0 flex flex-col gap-3 items-center px-3 py-5 rounded-t-3xl border-2 border-gray-400 shadow-md">
        <h3 className="text-2xl font-bold">Ride has started...</h3>
        <button
          className="bg-orange-400  px-5 py-4 rounded-full mt-5 text-xl sm:text-2xl font-semibold"
          onClick={() => setCompleteRidePanelOpen(true)}
        >
          Complete Ride
        </button>
      </div>
      <div
        ref={completeRideRef}
        className="fixed w-full  bottom-0  translate-y-full   z-[1002] bg-yellow-100 rounded-3xl  shadow-lg flex flex-col gap-10 items-center px-3 py-5 border-2 border-gray-400 "
      >
        <div className="flex justify-between items-center w-full">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-center sm:text-left">
              Confirm your ride
            </h2>
          </div>
        </div>
        <div className="w-full flex justify-between items-center  px-3">
          <div className="flex gap-5 items-center">
            <div>
              <img
                src="https://media.smallbiztrends.com/2023/07/How-to-Become-an-Uber-Driver.png"
                className="h-20 w-20 object-center object-cover rounded-full"
              ></img>
            </div>
            <div>
              <h3>
                <span className="text-lg ">Rider Name</span>
              </h3>
            </div>
          </div>
          <div>
            <h3 className="w-full text-end text-lg ">Distance</h3>
          </div>
        </div>

        <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
          <MapPin className="h-6 w-6 text-gray-700 flex-shrink-0" />
          <h3 className="text-md sm:text-lg font-semibold">Pickup Location</h3>
        </div>
        <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
          <MapPinOff className="h-6 w-6 text-gray-700 flex-shrink-0" />
          <h3 className="text-md sm:text-lg font-semibold">Drop Location</h3>
        </div>
        <div className="flex items-center gap-10 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 active:border-2 active:border-black w-full text-left transition-colors">
          <Coins className="h-6 w-6 text-gray-700 flex-shrink-0" />
          <h3 className="text-md sm:text-lg font-semibold">₹60</h3>
        </div>
        <form className="w-full">
          <input
            className="w-full border-2 rounded-lg px-8 md:px-10 py-3 md:py-4 text-base md:text-lg bg-gray-200"
            type="text"
            placeholder="Enter your OTP"
          />
          <div className="flex items-center justify-center  w-full ">
            <Link
              to={"/captain-home"}
              className="bg-green-300 flex justify-center items-center w-full  px-5 py-4 rounded-full mt-5 text-xl sm:text-2xl font-semibold active:border-2 active:border-black transition-all duration-200"
            >
              Finish Ride
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptainRidingStart;
