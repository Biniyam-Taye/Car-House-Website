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

  //function changeRole
  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4
        text-gray-600 border-b border-borderColor relative transition-all
        ${location.pathname === "/" ? "bg-light" : "bg-white"}`}
    >
      {/* Logo */}
      <Link to="/">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="logo"
          className="h-8"
        />
      </Link>

      {/* Menu Links & Search */}
      <div
        className={`fixed top-16 right-0 h-screen w-full sm:h-auto sm:w-auto sm:static
          flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-4
          sm:p-0 border-t sm:border-none border-borderColor bg-white sm:bg-transparent
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"} sm:translate-x-0`}
      >
        {/* Navigation Links */}
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="hover:text-primary transition-colors"
            onClick={() => setOpen(false)} // Close menu on click (mobile)
          >
            {link.name}
          </Link>
        ))}

        {/* Search Input (Desktop Only) */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            placeholder="Search Products"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
          />
          <img src={assets.search_icon} alt="search" />
        </div>

        {/* Dashboard & Login Buttons */}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6 ">
          <button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="cursor-pointer"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>
          <button
            onClick={() => {
              user ? logOut() : setShowLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="sm:hidden cursor-pointer z-50"
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
  );
};

export default Navbar;
