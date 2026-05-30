import React, { useState, useEffect } from "react";
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

  const isHomePage = location.pathname === "/";
  const [isVisible, setIsVisible] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <div className={`px-6 md:px-12 pt-6 z-50 fixed w-full top-0 left-0 transition-all duration-300 ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}>
      <motion.div role="navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex items-center justify-between px-6 md:px-10 py-5 mx-auto w-full max-w-[98%]
          text-gray-600 bg-white/90 backdrop-blur-md relative transition-all rounded-[40px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border-[2.5px] border-gray-200"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.img
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            src={assets.logo}
            alt="logo"
            className="h-9 md:h-10 cursor-pointer"
          />
          <span className="text-xl font-extrabold text-gray-900 hidden sm:block tracking-tight transition-all duration-500 bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 bg-[size:200%] bg-clip-text group-hover:text-transparent group-hover:bg-right">
            HotelDemo
          </span>
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
              className="relative px-5 py-2.5 font-semibold text-[15px] text-gray-600 transition-all duration-300 hover:text-white rounded-full group flex items-center justify-center"
              onClick={() => setOpen(false)} // Close menu on click (mobile)
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 rounded-full shadow-[0_6px_20px_rgba(37,99,235,0.35)]"></span>
              <span className="relative z-10">{link.name}</span>
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
            {!user && (
              <button
                onClick={() => setShowLogin(true)}
                className="relative px-5 py-2.5 font-semibold text-[15px] text-gray-600 transition-all duration-300 rounded-full hover:text-white border border-gray-200 hover:border-transparent group overflow-hidden hidden sm:flex items-center justify-center cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 to-gray-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-full -z-10"></span>
                <span className="relative z-10">Login</span>
              </button>
            )}
            <button
              onClick={() => {
                user ? logOut() : setShowLogin(true);
              }}
              className="cursor-pointer w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 text-white font-semibold rounded-full relative overflow-hidden flex items-center justify-center gap-0 hover:gap-2 shadow-[0_4px_15px_rgba(30,120,255,0.3)] hover:shadow-[0_8px_25px_rgba(30,120,255,0.5)] hover:scale-105 group"
            >
              <span className="relative z-10 transition-all duration-300">{user ? "Logout" : "Sign Up"}</span>
              <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 flex items-center">
                <svg className="w-4 h-4 text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
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
