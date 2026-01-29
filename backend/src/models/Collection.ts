import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
  collector: { type: mongoose.Schema.Types.ObjectId, ref: "Collector" },
  amount: Number,
  date: { type: String },
  time: { type: String },
});

export default mongoose.model("Collection", collectionSchema);
