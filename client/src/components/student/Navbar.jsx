import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser, logout, isEducator } = useApp();
  const isCoursePageList = location.pathname.includes("/course-list");

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      className={`relative z-50 border-b border-gray-500 ${
        isCoursePageList ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <img
            src={assets.logo}
            alt="logo"
            className="w-28 lg:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 text-gray-500">
            <div className="flex items-center gap-5">
              {currentUser && (
                <>
                  <button
                    onClick={() => navigate("/educator")}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {isEducator ? "Educator Dashboard" : "Become Educator"}
                  </button>
                  <span>|</span>
                  <Link
                    to="my-enrollments"
                    className="hover:text-gray-700 transition-colors"
                  >
                    My Enrollments
                  </Link>
                </>
              )}
            </div>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span>{currentUser.email}</span>
                <button
                  onClick={handleLogout}
                  className="custom-btn px-5 py-2 rounded-full! transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="hover:text-gray-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-950 text-white px-5 py-2 rounded-full transition-colors"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {currentUser && (
            <>
              <button
                onClick={() => {
                  navigate("/educator");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link
                to="my-enrollments"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
              >
                My Enrollments
              </Link>
            </>
          )}
          {currentUser ? (
            <div className="space-y-2">
              <p className="px-3 py-2 text-gray-500">{currentUser.email}</p>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-500 hover:text-red-700 hover:bg-gray-50 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-blue-600 hover:text-blue-950 hover:bg-gray-50 rounded-md"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
