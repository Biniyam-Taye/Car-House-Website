import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PublicRoutes from "../routes/PublicRoutes";
import OwnerRoutes from "../routes/OwnerRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import ScrollToTop from "../components/ScrollToTop";

const LayoutWrapper = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");
  const isAdminPath = location.pathname.startsWith("/admin");
  const isAuthPath = location.pathname === "/login" || location.pathname === "/signup";
  const hideHeaderFooter = isOwnerPath || isAuthPath || isAdminPath;

  const renderRoutes = () => {
    if (isOwnerPath) return <OwnerRoutes />;
    if (isAdminPath) return <AdminRoutes />;
    return <PublicRoutes />;
  };

  return (
    <>
      <ScrollToTop />
      {/* Navbar displayed only on public pages */}
      {!hideHeaderFooter && <Navbar />}
      {/* Render appropriate route tree */}
      {renderRoutes()}
      {/* Footer displayed only on public pages */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default LayoutWrapper;
