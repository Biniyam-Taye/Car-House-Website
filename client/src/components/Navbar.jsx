import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {
  const { setShowLogin, user, logOut, isOwner, axios, setIsOwner } =
    useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();



  return (
    <div className="px-2 md:px-4 pt-3 z-50 fixed w-full top-0 left-0">
      <motion.div role="navigation"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="flex items-center justify-between px-6 md:px-10 py-5 mx-auto w-full max-w-[98%]
          text-gray-600 bg-white/90 backdrop-blur-md relative transition-all rounded-[40px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border-[2.5px] border-gray-200"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.img
            whileHover={{ scale: 1.1, rotate: 5 }}
            src={assets.logo}
            alt="logo"
            className="h-10 md:h-11"
          />
          <span className="text-xl font-extrabold text-gray-900 hidden sm:block tracking-tight">HotelDemo</span>
        </Link>

        {/* Menu Links & Search */}
        <div
          className={`absolute top-20 right-0 h-screen w-full sm:h-auto sm:w-auto sm:static
            flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-6
            sm:p-0 rounded-3xl sm:rounded-none shadow-2xl sm:shadow-none bg-white sm:bg-transparent
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "translate-x-full"} sm:translate-x-0`}
        >
          {/* Navigation Links */}
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="relative font-medium text-gray-600 px-4 py-2 rounded-full transition-all duration-300 hover:text-blue-600 hover:bg-blue-50/80 hover:shadow-[0_4px_12px_rgba(59,130,246,0.08)] hover:scale-105"
              onClick={() => setOpen(false)} // Close menu on click (mobile)
            >
              {link.name}
            </Link>
          ))}

          {/* Search Input (Desktop Only) */}
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-200 px-4 py-2 rounded-full max-w-xs hover:border-blue-400 hover:shadow-md transition-all duration-300">
            <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-50" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent outline-none placeholder-gray-400 font-medium"
            />
          </div>

          {/* Dashboard & Login Buttons */}
          <div className="flex max-sm:flex-col items-start sm:items-center gap-4 w-full sm:w-auto">
            {isOwner && (
              <button
                onClick={() => navigate("/owner")}
                className="font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-full hover:bg-gray-50"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={() => {
                !user && setShowLogin(true);
              }}
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors hidden sm:block px-3 py-1.5 rounded-full hover:bg-gray-50"
            >
              {!user && "Login"}
            </button>
            <button
              onClick={() => {
                user ? logOut() : setShowLogin(true);
              }}
              className="cursor-pointer w-full sm:w-auto px-6 py-2.5 bg-[#1e78ff] hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(30,120,255,0.6)] text-white font-semibold rounded-full"
            >
              {user ? "Logout" : "Sign Up"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden cursor-pointer z-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="h-6 w-6"
          />
        </button>
      </motion.div>
    </div>
  );
};

export default Navbar;
