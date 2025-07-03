import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    createdBy_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    location: {
      type: String,
      required: true,
    },
    is_claimed: {
      type: Boolean,
      default: false,
    },
    uniqueQuestion: {
      type: String,
      required: true,
    },
    itemPicture: {
      type: String, 
      required: false,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    is_lost: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.models.item || mongoose.model("item", itemSchema);
export default Item;
