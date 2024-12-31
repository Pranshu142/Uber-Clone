import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CaptainLogoutButton from "../components/CaptainLogoutButton";
import CaptainDetails from "../components/CaptainDetails";
import RideAcceptPopUp from "../components/RideAcceptPopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import CaptainConfirmRide from "../components/CaptainConfirmRide";
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

const CaptainHome = () => {
  const ridePopUp = useRef(null);
  const CaptainConfirmRideRef = useRef(null);
  const [CaptainConfirmRidePanelOpen, setCaptainConfirmRidePanelOpen] =
    useState(false);
  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(false);

  useGSAP(() => {
    if (ridePopUpPanelOpen) {
      gsap.to(ridePopUp.current, {
        transform: "translateY(0)",

        duration: 0.4,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(ridePopUp.current, {
        transform: "translateY(100%)",

        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [ridePopUpPanelOpen]);
  useGSAP(() => {
    if (CaptainConfirmRidePanelOpen) {
      gsap.to(CaptainConfirmRideRef.current, {
        transform: "translateY(0 )",
        height: "100vh",
        duration: 0.4,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(CaptainConfirmRideRef.current, {
        transform: "translateY(100% )",
        height: "0vh",

        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [CaptainConfirmRidePanelOpen]);

  return (
    <div className="h-screen w-screen relative">
      {/* Logout Button */}
      <CaptainLogoutButton
        className="absolute top-4 right-4 z-[1001]"
        setRidePopUpPanelOpen={setRidePopUpPanelOpen}
        ridePopUpPanelOpen={ridePopUpPanelOpen}
      />

      {/* Map */}
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

      {/* Basic Ride Info */}
      <div className="absolute bg-yellow-100 h-[50vh] z-[1001] w-full bottom-0 flex flex-col gap-10 items-center px-3 py-5 rounded-t-3xl border-2 border-gray-400 shadow-md">
        <CaptainDetails />
      </div>

      {/* Ride Pop-Up */}
      <div
        ref={ridePopUp}
        className="fixed w-full  bottom-0  translate-y-full   z-[1001] bg-yellow-100  shadow-lg flex flex-col gap-10 items-center px-3 py-5 rounded-t-3xl border-2 border-gray-400 "
      >
        <RideAcceptPopUp
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          setCaptainConfirmRidePanelOpen={setCaptainConfirmRidePanelOpen}
        />
      </div>
      <div
        ref={CaptainConfirmRideRef}
        className="fixed w-full  bottom-0  translate-y-full   z-[1002] bg-yellow-100  shadow-lg flex flex-col gap-10 items-center px-3 py-5 border-2 border-gray-400 "
      >
        <CaptainConfirmRide
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          setCaptainConfirmRidePanelOpen={setCaptainConfirmRidePanelOpen}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
