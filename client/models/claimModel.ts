import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uniqueAnswer: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
  },
  { timestamps: true }
);

const Claim = mongoose.models.claims || mongoose.model("claims", claimSchema);
export default Claim;