import axiosInstance from "./axiosInstance";

export const getAllProductsAPI = (params) =>
  axiosInstance.get("/products", { params });

export const getProductByIdAPI = (id) => axiosInstance.get(`/products/${id}`);

// ✅ Admin APIs
export const createProductAPI = (data) => axiosInstance.post("/products", data);

export const updateProductAPI = (id, data) =>
  axiosInstance.put(`/products/${id}`, data);

export const deleteProductAPI = (id) => axiosInstance.delete(`/products/${id}`);
