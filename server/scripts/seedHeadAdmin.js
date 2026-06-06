import bcrypt from "bcrypt";
import User from "../models/user.js";

const seedHeadAdmin = async () => {
  const email = process.env.HEAD_ADMIN_EMAIL || "headadmin@gearshift.com";
  const password = process.env.HEAD_ADMIN_PASSWORD || "HeadAdmin@2026";
  const name = process.env.HEAD_ADMIN_NAME || "Head Admin";

  const existing = await User.findOne({ role: "head_admin" });
  if (existing) {
    console.log("✅ Head Admin account already exists:", existing.email);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashedPassword,
    role: "head_admin",
    approvalStatus: "approved",
  });

  console.log("✅ Head Admin account created:", email);
};

export default seedHeadAdmin;
