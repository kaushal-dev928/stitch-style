const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ✅ Public routes — koi bhi dekh sakta hai
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ✅ Admin only routes
router.post("/", auth, admin, createProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;
