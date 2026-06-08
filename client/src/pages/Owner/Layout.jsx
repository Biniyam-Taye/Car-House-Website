import React from "react";
import NavbarOwn from "../../components/Owner/NavbarOwner";
import Sidebar from "../../components/Owner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const Layout = () => {
  const { isOwner, user, navigate, userLoading } = useAppContext();

  useEffect(() => {
    if (!userLoading && user && !isOwner) {
      navigate("/");
    }
  }, [isOwner, user, navigate, userLoading]);

  if (userLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <NavbarOwn />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
