import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  editCar,
  getDashboardData,
  getOwnerCars,
  toggleCarAvailability,
  updateUserImage,
  updateOwnerProfile,
} from "../controller/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post(
  "/add-car",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
  ]),
  protect,
  addCar
);
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.post(
  "/edit-car",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
  ]),
  protect,
  editCar
);

ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage
);
ownerRouter.post("/update-profile", protect, updateOwnerProfile);

export default ownerRouter;
