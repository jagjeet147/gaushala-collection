import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import adminRoutes from "./routes/admin.routes";
import collectorRoutes from "./routes/collector.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/collector", collectorRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Error:", err));
