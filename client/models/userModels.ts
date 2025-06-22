import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    rollNumber: {
        type: Number,
        required: [true, "Please provide a roll number"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: Number,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],

    }
    // Writing for reset password feature
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;