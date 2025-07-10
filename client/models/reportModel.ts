import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    reason: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);
export default Report;