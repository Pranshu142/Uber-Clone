import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { gsap } from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import AvailableRidesType from "../components/AvailableRidesType.jsx";
import ConfirmRidePannel from "../components/ConfirmRidePannel.jsx";
import WaitingCaptainPannel from "../components/WaitingCaptainPannel.jsx";
import LookingForCaptain from "../components/LookingForCaptain.jsx";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const RiderHome = () => {
  const mapRef = useRef(null);
  const panelRef = useRef(null);

  const closeRef = useRef(null);
  const waitingCaptainRef = useRef(null);
  const rideTypePannelRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const closeRideTypePannelRef = useRef(null);
  const closeConfirmRidePannelRef = useRef(null);
  const lookingForCaptainRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [waitingCaptainPannel, setWaitingCaptainPannel] = useState(false);
  const [lookingForCaptainPannel, setLookingForCaptainPannel] = useState(false);
  const [rideTypePannelOpen, setRideTypePannelOpen] = useState(false);

  useGSAP(() => {
    if (panelOpen) {
      // Animate panel sliding up
      gsap.to(panelRef.current, {
        height: "73%",
        duration: 0.3,
        ease: "power3.out",
        padding: "10px",
      });
      gsap.to(closeRef.current, {
        opacity: "1",
      });
    } else {
      // Animate panel sliding down
      gsap.to(panelRef.current, {
        height: "0%",
        padding: "0",
        duration: 0.3,
        ease: "power3.in",
      });
      gsap.to(closeRef.current, {
        opacity: "0",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (rideTypePannelOpen) {
      gsap.to(rideTypePannelRef.current, {
        height: "85vh",

        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(closeRideTypePannelRef.current, {
        opacity: "1",
      });
    } else {
      gsap.to(rideTypePannelRef.current, {
        height: "0",
        duration: 0.5,

        ease: "power3.in",
      });
      gsap.to(closeRideTypePannelRef.current, {
        opacity: "0",
      });
    }
  }, [rideTypePannelOpen]);

  useGSAP(() => {
    if (confirmRidePannel) {
      gsap.to(confirmRidePannelRef.current, {
        height: "85vh",

        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(closeConfirmRidePannelRef.current, {
        opacity: "1",
      });
    } else {
      gsap.to(closeConfirmRidePannelRef.current, {
        opacity: "0",
      });
      gsap.to(confirmRidePannelRef.current, {
        height: "0",

        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [confirmRidePannel]);
  useGSAP(() => {
    if (lookingForCaptainPannel) {
      gsap.to(lookingForCaptainRef.current, {
        height: "85vh",
        duration: 0.5,
        ease: "power3.in",
      });
    } else {
      gsap.to(lookingForCaptainRef.current, {
        height: "0",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [lookingForCaptainPannel]);

  useGSAP(() => {
    if (waitingCaptainPannel) {
      gsap.to(waitingCaptainRef.current, {
        height: "85vh",
        duration: 0.5,
        ease: "power3.in",
      });
    } else {
      gsap.to(waitingCaptainRef.current, {
        height: "0",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [waitingCaptainPannel]);
  return (
    <div className="relative h-screen w-screen">
      <img
        className="w-14 ml-12 mb-5 absolute z-[900]"
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
        alt="Uber logo"
      />
      {/* Map */}
      <div ref={mapRef} className="h-full w-full">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-screen w-screen mb-0 pb-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>

      {/* Booking Form */}
      <div className=" absolute justify-end flex flex-col h-screen top-0  w-screen  z-[1001]">
        <div className="h-[27%]  p-2 bg-white relative w-full ">
          <div className="flex justify-between items-center ">
            <h3 className="text-4xl font-bold mb-5">Find a ride</h3>
            <i
              ref={closeRef}
              className="ri-arrow-down-s-line ri-2x opacity-0"
              onClick={() => {
                setPanelOpen(false);
              }}
            ></i>
          </div>
          <form className="space-y-4 relative  ">
            <i className="ri-record-circle-line absolute top-[13%] left-4"></i>
            <div className="absolute w-0 h-[50px]  border-2  border-gray-700 rounded-full top-[32%] left-[5%]"></div>

            <i className="ri-map-pin-fill absolute bottom-[2%] left-4"></i>
            <input
              className="w-full border-2 rounded-lg px-10 py-4 text-lg"
              type="text"
              placeholder="Enter your pickup location"
              onClick={() => {
                setPanelOpen(true);
              }}
            />
            <input
              className="w-full border-2 rounded-lg px-10 py-4 text-lg"
              type="text"
              placeholder="Enter your drop-off location"
              onClick={() => {
                setPanelOpen(true);
              }}
            />
          </form>
        </div>
        {/* Expanding Panel */}
        <div
          ref={panelRef}
          className="w-full bg-white h-0 p-0 overflow-y-auto relative"
        >
          <LocationSearchPanel
            setPannelOpen={setPanelOpen}
            setRideTypePannelOpen={setRideTypePannelOpen}
          />
        </div>
        <div
          ref={rideTypePannelRef}
          className="absolute h-0 bg-white w-full px-0 py-0 overflow-y-auto"
        >
          <AvailableRidesType
            setRideTypePannelOpen={setRideTypePannelOpen}
            closeRideTypePannelRef={closeRideTypePannelRef}
            setConfirmRidePannel={setConfirmRidePannel}
          />
        </div>
        <div
          ref={confirmRidePannelRef}
          className="absolute    h-0 bg-white w-full px-0 py-0 overflow-y-auto"
        >
          <ConfirmRidePannel
            setLookingForCaptainPannel={setLookingForCaptainPannel}
            setConfirmRidePannel={setConfirmRidePannel}
            closeConfirmRidePannelRef={closeConfirmRidePannelRef}
          />
        </div>
        <div
          ref={lookingForCaptainRef}
          className="fixed h-0 bg-white w-full px-0 py-0overflow-y-auto"
        >
          <LookingForCaptain
            setLookingForCaptainPannel={setLookingForCaptainPannel}
          />
        </div>
        <div
          ref={waitingCaptainRef}
          className="fixed h-0 bg-white w-full px-0 py-0 overflow-y-auto"
        >
          <WaitingCaptainPannel
            setWaitingCaptainPannel={setWaitingCaptainPannel}
          />
        </div>
      </div>
    </div>
  );
};

export default RiderHome;
