import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" },
    brand: { type: String },
    model: { type: String },
    image: { type: String },
    year: { type: Number },
    category: { type: String },
    seating_capacity: { type: Number },
    fuel_type: { type: String },
    transmission: { type: String },
    pricePerDay: { type: Number },
    location: { type: String },
    description: { type: String },
    isAvaliable: { type: Boolean, default: true },
    // New Optional Specification Fields
    generation: { type: String },
    trim: { type: String },
    engine: { type: String },
    battery_capacity: { type: String },
    drive_type: { type: String },
    top_speed: { type: String },
    fuel_consumption: { type: String },
    range: { type: String },
    dimensions: { type: String },
    color: { type: String },
    plate_no: { type: String },
    mileage: { type: String },
    condition: { type: String },
    features: { type: [String], default: [] },
    // Pricing & Financing Options
    cash_price: { type: Number },
    bank_price: { type: Number },
    bank_info: { type: String },
    sale_price: { type: Number },
    // Multiple Sub Images
    subImages: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
