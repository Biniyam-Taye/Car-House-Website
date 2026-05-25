import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";

const Home = lazy(() => import("../pages/Home"));
const Cars = lazy(() => import("../pages/Cars"));
const CarDetails = lazy(() => import("../pages/CarDetails"));
const MyBookings = lazy(() => import("../pages/MyBookings"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));

const PublicRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default PublicRoutes;
