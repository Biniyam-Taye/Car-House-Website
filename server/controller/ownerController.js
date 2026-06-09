import User from "../models/user.js";
import imageKit from "../configs/imageKit.js";
import Car from "../models/car.js";
import booking from "../models/Booking.js";
import fs from "fs";

const isApprovedOwner = (user) =>
  user.role === "owner" && user.approvalStatus === "approved";

// API to change role of user
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {
      role: "owner",
      approvalStatus: "pending",
    });
    res.json({
      success: true,
      message: "Application submitted. Wait for Head Admin approval.",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list Car
export const addCar = async (req, res) => {
  try {
    const { _id, role, approvalStatus } = req.user;
    if (!isApprovedOwner({ role, approvalStatus })) {
      return res.json({ success: false, message: "unauthorized" });
    }
    let car = JSON.parse(req.body.carData);
    
    // Multer upload.fields puts files in req.files
    const imageFile = req.files && req.files["image"] ? req.files["image"][0] : null;
    const subImageFiles = req.files && req.files["subImages"] ? req.files["subImages"] : [];

    let image = "";
    if (imageFile) {
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

      image = optimizedImageUrl;
    }

    // Upload sub-images to ImageKit
    const subImages = [];
    for (const file of subImageFiles) {
      if (!file) continue;
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
    const { _id, role, approvalStatus } = req.user;
    if (!isApprovedOwner({ role, approvalStatus })) {
      return res.json({ success: false, message: "unauthorized" });
    }
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
    const { _id, role, approvalStatus } = req.user;
    if (!isApprovedOwner({ role, approvalStatus })) {
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
    res.json({ success: true, message: "Image Updated", image });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to edit/update a car
export const editCar = async (req, res) => {
  try {
    const { _id, role, approvalStatus } = req.user;
    if (!isApprovedOwner({ role, approvalStatus })) {
      return res.json({ success: false, message: "unauthorized" });
    }

    const { carId } = req.body;
    let carData = JSON.parse(req.body.carData);

    const car = await Car.findById(carId);
    if (!car || car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "unauthorized" });
    }

    // Handle main image upload if provided
    const imageFile =
      req.files && req.files["image"] ? req.files["image"][0] : null;
    if (imageFile) {
      const fileBuffer = fs.readFileSync(imageFile.path);
      const response = await imageKit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/cars",
      });
      const optimizedImageUrl = imageKit.url({
        path: response.filePath,
        transformation: [
          { width: "1280" },
          { quality: "auto" },
          { format: "webp" },
        ],
      });
      carData.image = optimizedImageUrl;
    }

    // Handle sub-images upload if provided
    const subImageFiles =
      req.files && req.files["subImages"] ? req.files["subImages"] : [];
    if (subImageFiles.length > 0) {
      const subImages = [];
      for (const file of subImageFiles) {
        if (!file) continue;
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
      carData.subImages = subImages;
    }

    // Update the car document
    await Car.findByIdAndUpdate(carId, carData);

    res.json({ success: true, message: "Car Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const updateOwnerProfile = async (req, res) => {
  try {
    const { _id, role, approvalStatus } = req.user;
    if (!isApprovedOwner({ role, approvalStatus })) {
      return res.json({ success: false, message: "unauthorized" });
    }

    const { name, phone, businessName, location, bio } = req.body;

    if (!name || !phone || !businessName || !location) {
      return res.json({
        success: false,
        message: "Please fill all required profile fields",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, phone, businessName, location, bio: bio || "" },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
