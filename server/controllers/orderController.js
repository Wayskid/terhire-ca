import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

export const getOrders = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { filter_by } = req.query;

    //Check if its admin trying to get all orders
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    //Get all orders
    const orders = await Order.find(
      filter_by
        ? {
            delivered: filter_by,
          }
        : {}
    ).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { order_no } = req.params;

    //Get order details
    const order = await Order.findOne({ order_no });

    if (!order) throw new Error("Sorry we cannot find this order");

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const editOrder = async (req, res) => {
  try {
    const { status, date } = req.body;
    const { user_id, order_id } = req.params;

    //Check if its admin trying to edit order
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");
    console.log(date);
    //Edit order
    const order = await Order.findById(order_id);
    order.delivered = status;
    order.delivery_date = date;

    const updatedOrder = await order.save();
    res.status(201).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;

    //Get user orders
    const orders = await Order.find({
      user_id,
    });

    if (orders.length === 0) throw new Error("No orders placed yet");

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
