const express = require("express");
const router = express.Router();
const {
  register,
  verifyOTP,
  resendOTP,
  login,
  makeAdmin,
} = require("../controllers/authController");


router.post("/register", register); // Register + OTP bhejo
router.post("/verify-otp", verifyOTP); // OTP verify karo
router.post("/resend-otp", resendOTP); // OTP dobara bhejo
router.post("/login", login); // Login
router.post("/make-admin", makeAdmin);

module.exports = router;
