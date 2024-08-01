import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice'; // Import the logout action
import logo from '../image/logo.png';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Get the authentication state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <nav className="container flex items-center justify-around pt-4 pb-3 sticky top-0 z-50">
      <div className="bg-gray-200 bg-opacity-60 hover:bg-opacity-80 backdrop-blur p-2 cursor-pointer rounded-full transition duration-300">
        <a href="/">
          <strong className="text-xl"><span className="text-blue-500">Innov</span>Stack</strong>
        </a>
      </div>
      <ul
        className={`lg:flex items-center gap-1 rounded-full px-4 ml-[130px] bg-gray-200 bg-opacity-60 hover:bg-opacity-80 backdrop-blur text-gray-900 ${isMenuOpen ? 'flex flex-col lg:flex-row absolute top-16 left-0 w-full lg:w-auto bg-white shadow-lg lg:shadow-none' : 'hidden lg:flex'}`}
        style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
      >
        <a href="/">
          <li className="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            Home
          </li>
        </a>
        <a href="/guidex">
          <li className="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            GuideX
          </li>
        </a>
        <a href="/poster">
          <li className="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            AI Poster
          </li>
        </a>
        <a href="/community">
          <li className="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            Add Success Stories
          </li>
        </a>
        <a href="/lms">
          <li className="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            LMS
          </li>
        </a>
        <a href="/crowd">
          <li className="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            CrowdFunding
          </li>
        </a>
        <a href="/dashboard">
          <li className="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            Dashboard
          </li>
        </a>
        <a href="/business">
          <li className="cursor-pointer select-none whitespace-nowrap rounded-full p-3 font-semibold transition duration-300 hover:text-blue-400">
            BusinessPlan
          </li>
        </a>
      </ul>
      <div className="flex items-center gap-4">
        <div style={{ transform: "none", transformOrigin: "100% 50% 0px" }}>
          <div className="flex gap-3">
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white inline-flex items-center whitespace-nowrap select-none justify-center font-medium gap-2 duration-200 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none rounded-lg disabled:opacity-50 disabled:grayscale bg-primary text-primary-foreground hover:bg-opacity-60 text-sm md:text-md px-5 md:px-7 py-2 md:py-3 shadow-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <a href="/signup">
                  <button
                    type="button"
                    className="bg-blue-500 text-white inline-flex items-center whitespace-nowrap select-none justify-center font-medium gap-2 duration-200 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none rounded-lg disabled:opacity-50 disabled:grayscale bg-primary text-primary-foreground hover:bg-opacity-60 text-sm md:text-md px-5 md:px-7 py-2 md:py-3 shadow-lg"
                  >
                    Sign up
                  </button>
                </a>
                <a href="/login">
                  <button
                    type="button"
                    className="bg-blue-500 text-white inline-flex items-center whitespace-nowrap select-none justify-center font-medium gap-2 duration-200 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none rounded-lg disabled:opacity-50 disabled:grayscale bg-primary text-primary-foreground hover:bg-opacity-60 text-sm md:text-md px-5 md:px-7 py-2 md:py-3 shadow-lg"
                  >
                    Login
                  </button>
                </a>
              </>
            )}
            <button
              className="relative h-12 w-12 shrink-0 cursor-pointer select-none rounded-full p-2 transition-all duration-300 focus:outline-none lg:hidden bg-gray-50 bg-opacity-60 hover:bg-opacity-80 backdrop-blur text-gray-900"
              onClick={toggleMenu}
            >
              <span className="sr-only">open menu</span>
              <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/3 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-5 transform bg-current transition duration-300 rounded-full ease-in-out -translate-y-[7px]"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-5 transform bg-current transition duration-300 rounded-full ease-in-out"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-5 transform bg-current transition duration-300 rounded-full ease-in-out translate-y-[7px]"
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
