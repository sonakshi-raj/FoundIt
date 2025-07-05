import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: Number,
        required: [true, "Please provide a username"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],

    },
    isBlocked: {
    type: Boolean,
    default: false,
  }
    // Writing for reset password feature and email verification
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;