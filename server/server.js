import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRouter.js";
import ownerRouter from "./routes/owneRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

//intialize express App
const app = express();

await connectDB();

//midlleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("server is running"));
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`✅ server running on port ${PORT}`));
