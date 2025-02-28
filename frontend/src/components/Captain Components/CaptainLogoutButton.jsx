import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * A functional component that renders a logout button for captains.
 * The button appears in the top right corner of the screen and triggers a logout action when clicked.
 *
 * @component
 * @returns {JSX.Element} A div containing a logout button with an icon
 *
 * @example
 * return (
 *   <CaptainLogoutButton />
 * )
 */
const CaptainLogoutButton = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/captain/logout");
  };

  return (
    <div className="absolute top-6 right-6 z-[1002] flex gap-4">
      {/* Logout Button */}
      <button
        onClick={logoutHandler}
        aria-label="Logout"
        className="bg-white hover:bg-gray-200 p-3 rounded-full shadow-md transition-all duration-200 ease-in-out"
      >
        <LogOut className="text-black h-6 w-6" />
      </button>
    </div>
  );
};

export default CaptainLogoutButton;
