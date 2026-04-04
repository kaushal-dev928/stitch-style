const Order = require("../models/Order");
const sendWhatsApp = require("../utils/whatsapp");
const { orderSchema } = require("../utils/validation");

// ✅ CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    // 🔥 validation
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { clothType, fabric, measurements, paymentMethod } = req.body;

    const order = new Order({
      userId: req.user._id, // ✅ FIXED
      clothType,
      fabric,
      measurements,
      paymentMethod,
      paymentStatus: "PAID",
      status: "CONFIRMED",
      timeline: [{ status: "CONFIRMED" }],
    });

    await order.save();

    console.log("✅ Order Created");

    res.status(201).json({
      msg: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET USER ORDERS (FIXED - MISSING FUNCTION)
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET SINGLE ORDER (TRACK)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        msg: "Order not found",
      });
    }

    res.json({
      id: order._id,
      clothType: order.clothType,
      status: order.status,
      timeline: order.timeline,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE STATUS + TIMELINE
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        msg: "Order not found",
      });
    }

    // update status
    order.status = status;

    // update timeline
    order.timeline.push({
      status,
      date: new Date(),
    });

    await order.save();

    console.log("🔄 Status Updated:", status);

    // 📲 WhatsApp trigger
    sendWhatsApp("919999999999", `📦 Order status: ${status}`);

    res.json({
      msg: "Status updated",
      order,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADMIN: GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
