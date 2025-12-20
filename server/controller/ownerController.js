import User from "../models/user.js";
import imageKit from "../configs/imageKit.js";
import Car from "../models/car.js";
import booking from "../models/Booking.js";
import fs from "fs";

// API to change role of user
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list Car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // if (!imageFile) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "No image uploaded" });
    // }

    // // ✅ Convert buffer to base64 (for ImageKit upload)
    // const base64File = imageFile.buffer.toString("base64");

    // // ✅ Upload image to ImageKit
    // const response = await imageKit.upload({
    //   file: base64File,
    //   fileName: imageFile.originalname, // fixed spelling
    //   folder: "/cars",
    // });

    //Upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // ✅ Optimize via ImageKit URL
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, //width resizing
        { quality: "auto" }, //auto compartion
        { format: "webp" }, // convert to modern format
      ],
    });

    // ✅ Save car info
    const image = optimizedImageUrl;
    await Car.create({ ...car, owner: _id, image });

    res.json({ success: true, message: "Car Added Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to list owner cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
//API to toggle car availiability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId); //check is the car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "unauthorized" });
    }
    car.isAvaliable = !car.isAvaliable;
    await car.save();

    res.json({ success: true, message: "Availiability Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId); //check is the car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "unuthorize" });
    }
    car.owner = null;
    car.isAvaliable = false;
    await car.save();

    res.json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data

export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;
    if (role !== "owner") {
      return res.json({ success: false, message: "unauthorized" });
    }
    const cars = await Car.find({ owner: _id });
    const bookings = await booking
      .find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await booking.find({
      owner: _id,
      status: "pending",
    });
    const complitedBookings = await booking.find({
      owner: _id,
      status: "confirmed",
    });

    //Calcilate monthly revenue  from status is confirmed
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);
    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      complitedBookings: complitedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to update user image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;
    //Upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // ✅ Optimize via ImageKit URL
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { width: "400" }, //width resizing
        { quality: "auto" }, //auto compartion
        { format: "webp" }, // convert to modern format
      ],
    });

    const image = optimizedImageUrl;

    await User.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "Image Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
