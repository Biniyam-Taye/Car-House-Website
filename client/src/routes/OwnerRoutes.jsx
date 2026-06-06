import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Layout from "../pages/Owner/Layout";

// Lazy loaded owner pages
const Dashboard = lazy(() => import("../pages/Owner/Dashboard"));
const AddCar = lazy(() => import("../pages/Owner/AddCar"));
const ManageCars = lazy(() => import("../pages/Owner/ManageCars"));
const ManageOrders = lazy(() => import("../pages/Owner/ManageBookings"));
const ProfileSettings = lazy(() => import("../pages/Owner/ProfileSettings"));

const OwnerRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/owner" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-car" element={<AddCar />} />
        <Route path="manage-cars" element={<ManageCars />} />
        <Route path="manage-bookings" element={<ManageOrders />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default OwnerRoutes;
