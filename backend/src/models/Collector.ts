import mongoose from "mongoose";

const collectorSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  loginId: { type: String, unique: true },
  password: String,
  status: { type: String, default: "active" },
});

export default mongoose.model("Collector", collectorSchema);
