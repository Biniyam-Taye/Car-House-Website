import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
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
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
