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
      <NavbarOwn sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar onNavigate={() => setSidebarOpen(false)} />

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 md:hidden z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: sidebarOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3, type: "tween" }}
          className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-borderColor z-50 shadow-2xl overflow-y-auto md:hidden"
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
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
