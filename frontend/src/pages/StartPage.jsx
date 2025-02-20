import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div>
      <div className="h-screen w-full flex flex-col justify-between items-start bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] bg-center bg-cover">
        <img
          className="w-14 ml-5"
          src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
          alt="Uber logo"
        />
        <div className="bg-white w-full flex flex-col justify-center items-center py-5 px-5">
          <h2 className="font-bold text-2xl">Get Started with Uber</h2>
          {/* navigation link to take the user to the login and sign up page */}
          <Link
            to="/login"
            className="flex justify-center items-center bg-black text-white rounded py-1.5 mt-2 w-full hover:bg-gray-800 transition-all duration-200"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
