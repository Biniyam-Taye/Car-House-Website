import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import LogoutConfirmModal from "../LogoutConfirmModal";

const Sidebar = ({ onNavigate }) => {
  const { user, axios, fetchUser, logOut, navigate } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full md:w-60 md:h-full flex flex-col">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex relative h-full flex-col items-center pt-8 w-60 border-r border-borderColor text-sm bg-white">
        <div className="group relative">
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : user?.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
              }
              alt=""
              className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div
              className="absolute hidden top-0 right-0 left-0 bottom-0
        bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer"
            >
              <img src={assets.edit_icon} alt="" />
            </div>
          </label>
        </div>
        {image && (
          <button
            className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 
      text-primary cursor-pointer"
            onClick={updateImage}
          >
            Save <img src={assets.check_icon} width={13} alt="" />
          </button>
        )}
        <p className="mt-2 text-base max-md:hidden">{user?.name}</p>
        <div className="w-full">
          {ownerMenuLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => onNavigate && onNavigate()}
              className={`relative flex items-center
      gap-2 w-full py-3 pl-4 first:mt-6 ${link.path === location.pathname
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600"
                }`}
            >
              <img
                src={
                  link.path === location.pathname ? link.coloredIcon : link.icon
                }
                alt="car-icon"
              />
              <span className="max-md:hidden">{link.name}</span>
              <div
                className={`${link.path === location.pathname && "bg-primary"}
      w-1.5 h-8 rounded-l right-0 absolute`}
              ></div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden flex relative flex-col h-full w-full text-sm bg-white">
        {/* Mobile Header with Logo & Close button */}
        <div className="flex items-center justify-between p-4 border-b border-borderColor">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="" className="h-8" />
            <span className="text-base font-bold text-gray-900">DriveLux</span>
          </div>
          <button
            onClick={() => onNavigate && onNavigate()}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-5 border-b border-borderColor bg-gray-50/50 flex flex-col items-center">
          <div className="group relative">
            <label htmlFor="image-mobile" className="block relative cursor-pointer">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : user?.image ||
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                }
                alt=""
                className="h-16 w-16 rounded-full border-2 border-primary/20 hover:border-primary transition"
              />
              <input
                type="file"
                id="image-mobile"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <div
                className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <img src={assets.edit_icon} alt="Edit" className="w-4 h-4 invert" />
              </div>
            </label>
          </div>
          {image && (
            <button
              className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full cursor-pointer hover:bg-primary-dull transition"
              onClick={updateImage}
            >
              Save <img src={assets.check_icon} width={10} alt="" className="invert" />
            </button>
          )}
          <h2 className="mt-3 text-base font-bold text-gray-900">{user?.name}</h2>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        {/* Links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {ownerMenuLinks.map((link, index) => {
            const isActive = link.path === location.pathname;
            return (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => onNavigate && onNavigate()}
                className={`flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={isActive ? link.coloredIcon : link.icon}
                    alt=""
                    className="w-5 h-5"
                    onError={(e) => {
                      e.target.src = link.icon;
                    }}
                  />
                  <span>{link.name}</span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-5 bg-primary rounded-full" />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Mobile Sidebar Footer / Logout */}
        <div className="p-4 border-t border-borderColor bg-gray-50/50">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer"
          >
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>

        <LogoutConfirmModal
          isOpen={showLogoutConfirm}
          onConfirm={() => {
            setShowLogoutConfirm(false);
            onNavigate && onNavigate();
            logOut();
            toast.success("Logged out successfully");
            navigate("/");
          }}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
