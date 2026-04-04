const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ OTP Generate karo
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ OTP Email bhejo
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Stitch & Style" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP - Stitch & Style",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <h2 style="color: #D4537E;">Stitch & Style</h2>
        <p>Your OTP for verification is:</p>
        <h1 style="color: #D4537E; letter-spacing: 8px;">${otp}</h1>
        <p>This OTP is valid for <strong>10 minutes</strong> only.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { generateOTP, sendOTPEmail };
