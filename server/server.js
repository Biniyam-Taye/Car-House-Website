import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRouter.js";
import ownerRouter from "./routes/owneRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import seedHeadAdmin from "./scripts/seedHeadAdmin.js";

//intialize express App
const app = express();

await connectDB();
await seedHeadAdmin();

//midlleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("server is running"));
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ server running on port ${PORT}`));
}

export default app;
