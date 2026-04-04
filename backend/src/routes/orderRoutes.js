const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createOrder,
  updateStatus,
  getOrderById,
  getUserOrders,
  getAllOrders,
} = require("../controllers/orderController");

// ✅ Admin route FIRST
router.get("/admin/all", auth, admin, getAllOrders);

// ✅ User routes
router.post("/", auth, createOrder);
router.get("/", auth, getUserOrders);
router.get("/:id", auth, getOrderById);

// ✅ Auth + Admin lagaya
router.put("/:id/status", auth, admin, updateStatus);

module.exports = router;
