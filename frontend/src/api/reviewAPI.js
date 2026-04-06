import axiosInstance from "./axiosInstance";

export const getReviewsAPI = () => axiosInstance.get("/reviews");

export const submitReviewAPI = (data) => axiosInstance.post("/reviews", data);

export const getMyReviewsAPI = () => axiosInstance.get("/reviews/my");

export const getAllReviewsAdminAPI = () =>
  axiosInstance.get("/reviews/admin/all");

export const approveReviewAPI = (id) =>
  axiosInstance.put(`/reviews/${id}/approve`);

export const deleteReviewAPI = (id) => axiosInstance.delete(`/reviews/${id}`);
