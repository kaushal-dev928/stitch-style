const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clothType: String,
    fabric: String,
    measurements: {
      chest: Number,
      waist: Number,
      hip: Number,
      length: Number,
    },

    // ✅ Duplicate hata diya — sirf ek rakha
    paymentMethod: {
      type: String,
      enum: ["PENDING", "PAID", "UPI", "CARD", "COD"],
      default: "PENDING",
    },

    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "MEASURE_VERIFIED", // ✅ Typo fix
        "STITCHING",
        "QUALITY_CHECK",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "ALTERATION",
      ],
      default: "PLACED",
    },
    paymentId: {
      type: String,
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    timeline: [
      {
        status: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
