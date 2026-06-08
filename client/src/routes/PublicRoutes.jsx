import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Loader from "../components/Loader";

const Home = lazy(() => import("../pages/Home"));
const Cars = lazy(() => import("../pages/Cars"));
const CarDetails = lazy(() => import("../pages/CarDetails"));
const MyBookings = lazy(() => import("../pages/MyBookings"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));
const Login = lazy(() => import("../components/Login"));

const PublicRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/success" element={<PaymentSuccess />} />
      <Route path="/login" element={<Login defaultState="login" />} />
      <Route path="/signup" element={<Login defaultState="register" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default PublicRoutes;
