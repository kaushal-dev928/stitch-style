import axiosInstance from "./axiosInstance";

// Razorpay order create karo
export const createPaymentAPI = (data) =>
  axiosInstance.post("/payment/create", data);

// Payment verify karo
export const verifyPaymentAPI = (data) =>
  axiosInstance.post("/payment/verify", data);

// Payment failed
export const paymentFailedAPI = (data) =>
  axiosInstance.post("/payment/failed", data);
