import axiosInstance from "./axiosInstance";

//order making
export const createOrderAPI = (data) => 
    axiosInstance.post("/orders", data);

//Apna orders dekho
export const getUserOrdersAPI = () =>
    axiosInstance.get("/orders");

//single order track karo
export const getOrderByIdAPI = (id) => 
    axiosInstance.get(`/orders/${id}`);

//admin- sab orders
export const getAllOrdersAPI = () =>
    axiosInstance.get("/orders/admin/all");