import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  donorName: String,
  shopName: String,
  whatsappNumber: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Collector" },
});

export default mongoose.model("Donor", donorSchema);
