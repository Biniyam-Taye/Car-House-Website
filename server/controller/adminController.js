import User from "../models/user.js";

export const getPendingOwners = async (req, res) => {
  try {
    if (req.user.role !== "head_admin") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const pendingOwners = await User.find({
      role: "owner",
      approvalStatus: "pending",
    }).select("-password");

    res.json({ success: true, pendingOwners });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getAllOwners = async (req, res) => {
  try {
    if (req.user.role !== "head_admin") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const owners = await User.find({ role: "owner" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({ success: true, owners });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const reviewOwnerApplication = async (req, res) => {
  try {
    if (req.user.role !== "head_admin") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const { ownerId, action, rejectionReason } = req.body;

    if (!ownerId || !["approve", "reject"].includes(action)) {
      return res.json({ success: false, message: "Invalid request" });
    }

    const owner = await User.findById(ownerId);
    if (!owner || owner.role !== "owner") {
      return res.json({ success: false, message: "Owner not found" });
    }

    if (action === "approve") {
      owner.approvalStatus = "approved";
      owner.rejectionReason = "";
    } else {
      owner.approvalStatus = "rejected";
      owner.rejectionReason = rejectionReason || "Application did not meet requirements.";
    }

    await owner.save();

    res.json({
      success: true,
      message:
        action === "approve"
          ? "Owner account approved successfully"
          : "Owner account rejected",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
