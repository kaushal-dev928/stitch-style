const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createPayment,
  verifyPayment,
  paymentFailed,
} = require("../controllers/paymentController");

// ✅ Payment create karo
router.post("/create", auth, createPayment);

// ✅ Payment verify karo
router.post("/verify", auth, verifyPayment);

// ✅ Payment failed
router.post("/failed", auth, paymentFailed);

module.exports = router;
