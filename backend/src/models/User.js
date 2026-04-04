const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // ✅ OTP fields add karo
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
