import React, { useState, useEffect } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {
  const { setShowLogin, user, logOut, isOwner, isHeadAdmin } =
    useAppContext();

  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className={`px-6 md:px-12 pt-6 z-50 fixed w-full top-0 left-0 transition-all duration-300 pointer-events-auto`}>
      <motion.div role="navigation"
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
            className="h-12 md:h-14 cursor-pointer"
          />
          <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight transition-all duration-500 bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 bg-[size:200%] bg-clip-text group-hover:text-transparent group-hover:bg-right">
            DriveLux
          </span>
        </Link>

        {/* Menu Links & Search */}
        <motion.div
          initial={false}
          animate={isDesktop || open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.2 }}
          className={`absolute top-20 right-0 h-screen w-full sm:h-auto sm:w-auto sm:static
            flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-6
            sm:p-0 rounded-3xl sm:rounded-none sm:shadow-none bg-white sm:bg-transparent
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "translate-x-full"} sm:translate-x-0`}
          style={{
            background: open ? "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)" : "transparent",
            boxShadow: open ? "0 20px 60px rgba(0, 0, 0, 0.15)" : "none",
            backdropFilter: open ? "blur(10px)" : "none"
          }}
        >
          {/* Mobile Header with Logo */}
          <div className="sm:hidden w-full flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              src={assets.logo}
              alt="logo"
              className="h-10 w-10"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">DriveLux</span>
          </div>

          {/* Navigation Links */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-4">
            {menuLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={isDesktop ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                animate={open || isDesktop ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={link.path}
                  className="relative px-5 py-3 font-semibold text-[15px] text-gray-600 transition-all duration-300 hover:text-white rounded-xl group flex items-center justify-center w-full sm:w-auto active:scale-95"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
                  <span className="relative z-10 transition-all">{link.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

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
          <div className="flex max-sm:flex-col sm:items-center gap-4 w-full sm:w-auto">
            {isHeadAdmin && (
              <motion.button
                initial={isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={open || isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate("/admin")}
                className="w-full sm:w-auto font-medium text-gray-700 hover:text-blue-600 transition-all px-4 py-2.5 rounded-lg hover:bg-blue-50 active:scale-95 duration-300"
              >
                Head Admin
              </motion.button>
            )}
            {isOwner && (
              <motion.button
                initial={isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={open || isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.25 }}
                onClick={() => navigate("/owner")}
                className="w-full sm:w-auto font-medium text-gray-700 hover:text-blue-600 transition-all px-4 py-2.5 rounded-lg hover:bg-blue-50 active:scale-95 duration-300"
              >
                Dashboard
              </motion.button>
            )}
            {!user && (
              <motion.button
                initial={isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={open || isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto relative px-6 py-2.5 font-semibold text-[15px] text-gray-700 transition-all duration-300 rounded-lg border border-gray-300 hover:border-blue-600 group overflow-hidden hidden sm:flex items-center justify-center cursor-pointer hover:bg-blue-50"
              >
                <span className="relative z-10">Login</span>
              </motion.button>
            )}
            <motion.button
              initial={isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={open || isDesktop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.35 }}
              onClick={() => {
                user ? logOut() : navigate("/signup");
              }}
              className="cursor-pointer w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 text-white font-semibold rounded-lg relative overflow-hidden flex items-center justify-center gap-0 hover:gap-2 shadow-[0_4px_15px_rgba(30,120,255,0.3)] hover:shadow-[0_8px_25px_rgba(30,120,255,0.5)] hover:scale-105 active:scale-95 group"
            >
              <span className="relative z-10 transition-all duration-300">{user ? "Logout" : "Sign Up"}</span>
              <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 flex items-center">
                <svg className="w-4 h-4 text-white shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="sm:hidden cursor-pointer z-50 p-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-300"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <motion.img
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="h-6 w-6"
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Navbar;
