import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RiderLogoutButton = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/rider/logout");
  };

  return (
    <div className="absolute top-16 right-2 bg-white rounded-full p-3 cursor-pointer">
      <LogOut
        color="#000000"
        absoluteStrokeWidth
        onClick={() => logoutHandler()}
      />
    </div>
  );
};

export default RiderLogoutButton;
