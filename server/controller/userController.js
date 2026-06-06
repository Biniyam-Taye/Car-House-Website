import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/car.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      businessName,
      location,
      bio,
    } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({
        success: false,
        message: "fill all the fildes or password greater than 8",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    if (role === "owner") {
      if (!phone || !businessName || !location || !bio) {
        return res.json({
          success: false,
          message: "Please complete your profile to list cars",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedRole = role === "owner" ? "owner" : "user";

    const userData = {
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
    };

    if (assignedRole === "owner") {
      userData.phone = phone;
      userData.businessName = businessName;
      userData.location = location;
      userData.bio = bio;
      userData.approvalStatus = "pending";
    }

    const user = await User.create(userData);

    if (assignedRole === "owner") {
      return res.json({
        success: true,
        pendingApproval: true,
        message:
          "Your application has been submitted. You can log in after the Head Admin approves your account.",
      });
    }

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.role === "owner") {
      if (user.approvalStatus === "pending") {
        return res.json({
          success: false,
          message:
            "Your account is pending approval. Please wait for the Head Admin to review your profile.",
        });
      }
      if (user.approvalStatus === "rejected") {
        return res.json({
          success: false,
          message: user.rejectionReason
            ? `Your account was rejected: ${user.rejectionReason}`
            : "Your account was rejected by the Head Admin.",
        });
      }
    }

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvaliable: true }).populate({
      path: "owner",
      select: "name email image",
      match: { approvalStatus: "approved", role: "owner" },
    });
    const availableCars = cars.filter((car) => car.owner);
    res.json({ success: true, cars: availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
