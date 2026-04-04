const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTPEmail } = require("../utils/emailService");

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await sendOTPEmail(email, otp);

    res.status(201).json({
      msg: "OTP sent to your email",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      msg: "Email verified!",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ RESEND OTP
exports.resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ msg: "Already verified" });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTPEmail(user.email, otp);

    res.json({ msg: "New OTP sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(400).json({
        msg: "Please verify your email first",
        userId: user._id,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ MAKE ADMIN — sirf ek baar use karo
exports.makeAdmin = async (req, res) => {
  try {
    const { phone, secretKey } = req.body;

    // Secret key check — sirf aap jante ho
    if (secretKey !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ msg: "Wrong secret key" });
    }

    const user = await User.findOneAndUpdate(
      { phone },
      { role: "admin" },
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({
      msg: "Admin ban gaya!",
      user: { name: user.name, phone: user.phone, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
