import { useState, useRef, useEffect } from "react";
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
import ConfirmRidePanel from "../components/ConfirmRidePannel.jsx";
import WaitingCaptainPanel from "../components/WaitingCaptainPannel.jsx";
import LookingForCaptain from "../components/LookingForCaptain.jsx";
import RiderLogoutButton from "../components/RiderLogoutButton.jsx";

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

const RiderHome = () => {
  const [panels, setPanels] = useState({
    main: false,
    rideType: false,
    confirmRide: false,
    lookingForCaptain: false,
    waitingCaptain: false,
  });

  const refs = {
    map: useRef(null),
    panel: useRef(null),
    close: useRef(null),
    logoutButton: useRef(null),
    waitingCaptainPanel: useRef(null),
    rideTypePanel: useRef(null),
    confirmRidePanel: useRef(null),
    closeRideTypePanel: useRef(null),
    closeConfirmRidePanel: useRef(null),
    lookingForCaptainPanel: useRef(null),
  };

  const animations = {
    panelOpen: {
      panel: {
        height: "73%",
        duration: 0.3,
        ease: "power3.out",
        padding: "10px",
      },
      close: { opacity: "1" },
      logout: { opacity: "0", pointerEvents: "none" },
    },
    panelClosed: {
      panel: {
        height: "0%",
        padding: "0",
        duration: 0.3,
        ease: "power3.in",
      },
      close: { opacity: "0" },
      logout: { opacity: "1", pointerEvents: "auto" },
    },
  };

  useGSAP(() => {
    const config = panels.main ? animations.panelOpen : animations.panelClosed;
    gsap.to(refs.panel.current, config.panel);
    gsap.to(refs.close.current, config.close);
    gsap.to(refs.logoutButton.current, config.logout);
  }, [panels.main]);
  useGSAP(() => {
    const config = panels.rideType
      ? animations.panelOpen
      : animations.panelClosed;

    gsap.to(refs.rideTypePanel.current, config.panel);

    gsap.to(refs.closeRideTypePanel.current, config.close);
  }, [panels.rideType]);

  useGSAP(() => {
    const config = panels.confirmRide
      ? animations.panelOpen
      : animations.panelClosed;
    gsap.to(refs.confirmRidePanel.current, config.panel);
    gsap.to(refs.closeConfirmRidePanel.current, config.close);
  }, [panels.confirmRide]);

  useGSAP(() => {
    const config = panels.waitingCaptain
      ? animations.panelOpen
      : animations.panelClosed;

    gsap.to(refs.waitingCaptainPanel.current, config.panel);
  }, [panels.waitingCaptain]);

  useGSAP(() => {
    const config = panels.lookingForCaptain
      ? animations.panelOpen
      : animations.panelClosed;

    gsap.to(refs.lookingForCaptainPanel.current, config.panel);
  }, [panels.lookingForCaptain]);

  const togglePanel = (panelName, value) => {
    setPanels((prev) => ({ ...prev, [panelName]: value }));
  };

  const renderPanel = (key, component) => (
    <div
      key={key}
      ref={refs[key]}
      className={`${
        key === "panel" ? "" : "absolute"
      } h-0 bg-white w-full p-0 overflow-y-auto`}
    >
      {component}
    </div>
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        className="w-16 md:w-14 ml-12 md:ml-14 mb-3 md:mb-5 absolute z-[900] top-5 md:top-4"
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
        alt="Uber logo"
      />
      <div ref={refs.logoutButton} className="absolute top-0 right-0">
        <RiderLogoutButton />
      </div>

      {/* Map */}
      <div ref={refs.map} className="h-full w-full">
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

      {/* Booking Form */}
      <div className="absolute justify-end flex flex-col h-screen top-0 w-screen z-[1001]">
        <div className="h-[27%] p-2 md:p-4 bg-white relative w-full">
          <div className="flex justify-between items-center px-2 md:px-4">
            <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5">
              Find a ride
            </h3>
            <i
              ref={refs.close}
              className="ri-arrow-down-s-line text-2xl md:text-3xl opacity-0 cursor-pointer"
              onClick={() => togglePanel("main", false)}
            />
          </div>

          <form className="space-y-3 md:space-y-4 relative px-3 md:px-5">
            <i className="ri-record-circle-line absolute top-[13%] left-6 md:left-8 text-lg md:text-xl" />
            <div className="absolute w-0 h-[40px] md:h-[50px] border-2 border-gray-400 rounded-full top-[32%] left-[5%] md:left-[6%]" />
            <i className="ri-map-pin-fill absolute bottom-[2%] left-6 md:left-8 text-lg md:text-xl" />

            <input
              className="w-full border-2 rounded-lg px-8 md:px-10 py-3 md:py-4 text-base md:text-lg"
              type="text"
              placeholder="Enter your pickup location"
              onClick={() => togglePanel("main", true)}
            />
            <input
              className="w-full border-2 rounded-lg px-8 md:px-10 py-3 md:py-4 text-base md:text-lg"
              type="text"
              placeholder="Enter your drop-off location"
              onClick={() => togglePanel("main", true)}
            />
          </form>
        </div>

        {/* Panels */}
        {renderPanel(
          "panel",
          <LocationSearchPanel
            setPannelOpen={(value) => togglePanel("main", value)}
            setRideTypePannelOpen={(value) => togglePanel("rideType", value)}
          />
        )}
        {renderPanel(
          "rideTypePanel",
          <AvailableRidesType
            setRideTypePannelOpen={(value) => togglePanel("rideType", value)}
            closeRideTypePannelRef={refs.closeRideTypePanel}
            setConfirmRidePannel={(value) => togglePanel("confirmRide", value)}
          />
        )}
        {renderPanel(
          "confirmRidePanel",
          <ConfirmRidePanel
            setLookingForCaptainPannel={(value) =>
              togglePanel("lookingForCaptain", value)
            }
            setConfirmRidePannel={(value) => togglePanel("confirmRide", value)}
            closeConfirmRidePannelRef={refs.closeConfirmRidePanel}
          />
        )}
        {renderPanel(
          "lookingForCaptainPanel",
          <LookingForCaptain
            setLookingForCaptainPannel={(value) =>
              togglePanel("lookingForCaptain", value)
            }
          />
        )}
        {renderPanel(
          "waitingCaptainPanel",
          <WaitingCaptainPanel
            setWaitingCaptainPannel={(value) =>
              togglePanel("waitingCaptain", value)
            }
          />
        )}
      </div>
    </div>
  );
};

export default RiderHome;
