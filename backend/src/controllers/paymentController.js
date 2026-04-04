const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ STEP 1 — Create Razorpay Order
exports.createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    const options = {
      amount: order.totalAmount * 100, // paise mein convert karo
      currency: "INR",
      receipt: `receipt_${orderId}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ STEP 2 — Verify Payment (Webhook)
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // signature verify karo
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ msg: "Invalid payment signature" });
    }

    // ✅ Payment verified — order update karo
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "PAID",
      paymentId: razorpay_payment_id,
      status: "CONFIRMED",
      $push: {
        timeline: { status: "CONFIRMED", date: new Date() },
      },
    });

    res.json({ msg: "Payment verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ STEP 3 — Payment Failed
exports.paymentFailed = async (req, res) => {
  try {
    const { orderId } = req.body;

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "FAILED",
      status: "CANCELLED",
    });

    res.json({ msg: "Payment marked as failed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
