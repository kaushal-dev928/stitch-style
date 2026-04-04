import axiosInstance from "./axiosInstance";

//register
export const registerAPI = (data) => 
    axiosInstance.post("/auth/register", data);

//verify otp
export const verifyOTPAPI = (data) =>
    axiosInstance.post("/auth/verify-otp", data);

//resend otp
export const resendOTPAPI = (data) =>
    axiosInstance.post("/auth/resend-otp", data);

//login
export const loginAPI = (data) =>
    axiosInstance.post("/auth/login", data);