const express = require("express");
const router = express.Router();
const {
  register,
  verifyOTP,
  resendOTP,
  login,
} = require("../controllers/authController");

router.post("/register", register); // Register + OTP bhejo
router.post("/verify-otp", verifyOTP); // OTP verify karo
router.post("/resend-otp", resendOTP); // OTP dobara bhejo
router.post("/login", login); // Login

module.exports = router;
