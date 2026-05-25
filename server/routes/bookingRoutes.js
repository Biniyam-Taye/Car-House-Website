import express from "express";
import { protect } from "../middleware/auth.js";
import {
  changeBookingStatus,
  checkAvailiabilityofCar,
  createBooking,
  createCheckoutSession,
  getOwnerBookings,
  getUserBookings,
} from "../controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailiabilityofCar);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.post("/checkout-session", protect, createCheckoutSession);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;
