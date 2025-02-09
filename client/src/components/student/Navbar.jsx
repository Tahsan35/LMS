import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser, logout, isEducator } = useApp();
  const isCoursePageList = location.pathname.includes("/course-list");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className={`flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCoursePageList ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {currentUser && (
            <>
              <button onClick={() => navigate("/educator")}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              |<Link to="my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {currentUser ? (
          <div className="flex items-center gap-4">
            <span>{currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">Login</Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-full"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div>
          <button onClick={() => navigate("/educator")}>
            {isEducator ? "Educator Dashboard" : "Become Educator"}
          </button>
          <Link to="my-enrollments">My Enrollments</Link>
          {currentUser ? (
            <button onClick={handleLogout}>
              <img src={assets.user_icon} alt="logout" />
            </button>
          ) : (
            <Link to="/login">
              <img src={assets.user_icon} alt="login" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
