import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";

const AdminLayout = () => {
  const { isHeadAdmin, user, userLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user && !isHeadAdmin) {
      navigate("/");
    }
  }, [isHeadAdmin, user, navigate, userLoading]);

  if (userLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-900 text-white px-6 md:px-12 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">GearShift Head Admin</h1>
          <p className="text-sm text-gray-300">Review and approve List Cars accounts</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        >
          Back to Site
        </button>
      </header>
      <main className="p-6 md:p-12 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
