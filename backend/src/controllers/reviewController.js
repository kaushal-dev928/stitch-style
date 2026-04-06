const Review = require("../models/Review");
const Order = require("../models/Order");

// ✅ USER — Review submit karo
exports.submitReview = async (req, res) => {
  try {
    const { orderId, rating, review } = req.body;

    // Order exist karta hai check karo
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    // Sirf delivered order pe review
    if (order.status !== "DELIVERED") {
      return res
        .status(400)
        .json({ msg: "Sirf delivered order pe review de sakte ho" });
    }

    // Already review diya?
    const existing = await Review.findOne({ orderId, userId: req.user._id });
    if (existing) {
      return res
        .status(400)
        .json({ msg: "Is order pe review already de diya hai" });
    }

    const newReview = await Review.create({
      userId: req.user._id,
      orderId,
      rating,
      review,
      clothType: order.clothType,
    });

    res
      .status(201)
      .json({ msg: "Review submitted! Approval ke baad dikhega.", newReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ PUBLIC — Approved reviews dekho
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ USER — Apne reviews dekho
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADMIN — Sab reviews dekho
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name phone")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADMIN — Review approve karo
exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true },
    );
    if (!review) return res.status(404).json({ msg: "Review not found" });
    res.json({ msg: "Review approved!", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADMIN — Review delete karo
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ msg: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
