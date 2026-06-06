import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import AdminLayout from "../pages/Admin/Layout";

const ManageOwners = lazy(() => import("../pages/Admin/ManageOwners"));

const AdminRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<ManageOwners />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AdminRoutes;
