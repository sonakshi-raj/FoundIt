import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "item", required: true },
    reportReason: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Report = mongoose.models.report || mongoose.model("report", reportSchema);
export default Report;