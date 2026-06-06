import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllOwners,
  getPendingOwners,
  reviewOwnerApplication,
} from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/pending-owners", protect, getPendingOwners);
adminRouter.get("/owners", protect, getAllOwners);
adminRouter.post("/review-owner", protect, reviewOwnerApplication);

export default adminRouter;
