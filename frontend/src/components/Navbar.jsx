
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthContext } from "../context/AuthContextProvider";

function Navbar() {
  const [bgCol, setBgCol] = useState("#252525");
  const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility

  const { isAuthenticated, logout } = useAuthContext();
  console.log(isAuthenticated, "ascxc");

  const handleLogout = () => {
    logout();
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav
      className={`w-full flex justify-between px-1 sm:px-2 h-16 items-center z-10 relative text-white`}
      style={{ backgroundColor: "#d44c4c" }}
    >
      <div className="w-2/12 sm:w-6/12 flex items-center sm:gap-10 h-full">
        <img src={logo} alt="" className="h-12 rounded-md ml-4" />
        <h3 className="text-sm sm:text-xl font-bold text-white">Hunger Help</h3>
      </div>
      {/* Hamburger menu icon */}
      <div className="sm:hidden" onClick={toggleMenu}>
        <svg
          className="w-6 h-6 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </div>
      {/* Navbar links */}
      <div
        className={`w-full text-sm sm:w-6/12 flex justify-around ${
          showMenu ? "block" : "hidden sm:flex" // Toggle menu visibility based on state
        }`}
      >
        <NavLink
          to={"/"}
          // activeClassName="active"
          className={({ isActive }) => (isActive ? `underline ` : null)}
        >
          Home
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? `underline ` : null)}
        >
          About
        </NavLink>
        <NavLink
          to={"/contact"}
          className={({ isActive }) => (isActive ? `underline ` : null)}
        >
          Contact us
        </NavLink>
        {/* Show login option always */}
        <NavLink
          to={"/login"}
          className={({ isActive }) => (isActive ? `underline ` : null)}
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
