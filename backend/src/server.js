require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// ✅ Middleware PEHLE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Routes BAAD MEIN
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);

// ✅ Error handler SABSE LAST
app.use(errorHandler);

// ✅ DB connect
connectDB();

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
