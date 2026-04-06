const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    clothType: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin approve karega
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Review", reviewSchema);
