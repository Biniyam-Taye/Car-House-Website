import React, { useEffect, useState } from "react";
import NavbarOwn from "../../components/Owner/NavbarOwner";
import Sidebar from "../../components/Owner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";
import { motion } from "motion/react";
import { assets } from "../../assets/assets";

const Layout = () => {
  const { isOwner, user, navigate, userLoading } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!userLoading && user && !isOwner) {
      navigate("/");
    }
  }, [isOwner, user, navigate, userLoading]);

  if (userLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen">
      <NavbarOwn />

      {/* Mobile Sidebar Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        <img src={sidebarOpen ? assets.close_icon : assets.menu_icon} alt="menu" className="w-6 h-6" />
      </motion.button>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 md:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: sidebarOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 h-full w-60 bg-white border-r border-borderColor z-40 md:hidden shadow-lg overflow-y-auto mt-16"
        >
          <Sidebar />
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
