const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  submitReview,
  getApprovedReviews,
  getMyReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} = require("../controllers/reviewController");

// ✅ Public
router.get("/", getApprovedReviews);

// ✅ User
router.post("/", auth, submitReview);
router.get("/my", auth, getMyReviews);

// ✅ Admin
router.get("/admin/all", auth, admin, getAllReviews);
router.put("/:id/approve", auth, admin, approveReview);
router.delete("/:id", auth, admin, deleteReview);

module.exports = router;
