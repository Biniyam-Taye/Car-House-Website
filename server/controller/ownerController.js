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
    
    // Multer upload.fields puts files in req.files
    const imageFile = req.files && req.files["image"] ? req.files["image"][0] : null;
    const subImageFiles = req.files && req.files["subImages"] ? req.files["subImages"] : [];

    if (!imageFile) {
      return res.json({ success: false, message: "Main image is required" });
    }

    // Upload main image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // Optimize via ImageKit URL
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageUrl;

    // Upload sub-images to ImageKit
    const subImages = [];
    for (const file of subImageFiles) {
      const subFileBuffer = fs.readFileSync(file.path);
      const subResponse = await imageKit.upload({
        file: subFileBuffer,
        fileName: file.originalname,
        folder: "/cars",
      });
      const optimizedSubUrl = imageKit.url({
        path: subResponse.filePath,
        transformation: [
          { width: "1280" },
          { quality: "auto" },
          { format: "webp" },
        ],
      });
      subImages.push(optimizedSubUrl);
    }

    // Save car info including sub-images
    await Car.create({ ...car, owner: _id, image, subImages });

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
