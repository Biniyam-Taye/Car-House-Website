import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const NavbarOwner = () => {
  const { user, logOut, navigate } = useAppContext();

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-10 py-4 text-gray-500 border-b border-borderColor bg-white shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="" className="h-10 md:h-12" />
        <span className="text-lg md:text-xl font-bold text-gray-900 hidden sm:block">DriveLux</span>
      </Link>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="text-center">
          <p className="text-sm md:text-base font-semibold text-gray-900">Welcome, {user?.name || "Owner"}</p>
          <p className="text-xs text-gray-500">{user?.email || ""}</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
        >
          Logout
        </motion.button>
      </div>
    </div>
  );
};

export default NavbarOwner;
