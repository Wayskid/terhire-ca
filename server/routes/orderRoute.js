import express from "express";
import {
  getOrders,
  getOrderDetails,
  editOrder,
  getUserOrders,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/auth.js";

const orderRoute = express.Router();

//Get all orders
orderRoute.get("/:user_id", verifyToken, getOrders);

//Get order details
orderRoute.get("/details/:order_no", getOrderDetails);

//Edit order
orderRoute.patch("/edit/:user_id/:order_id", verifyToken, editOrder);

//Get user orders
orderRoute.get("/history/:user_id", getUserOrders);

export default orderRoute;
