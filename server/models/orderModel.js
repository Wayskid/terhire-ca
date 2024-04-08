import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    session_id: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
      default: "Guest",
    },
    cart_items: {
      type: Array,
      require: true,
    },
    amount_subtotal: {
      type: Number,
      require: true,
    },
    amount_total: {
      type: Number,
      require: true,
    },
    order_no: {
      type: Number,
      require: true,
    },
    order_date: {
      type: Number,
      require: true,
    },
    currency: {
      type: String,
      require: true,
    },
    customer_id: {
      type: String,
      require: true,
    },
    customer_details: {
      type: Object,
      require: true,
    },
    payment_method_types: {
      type: Array,
      require: true,
    },
    payment_status: {
      type: String,
      require: true,
    },
    shipping_details: {
      type: Object,
      require: true,
    },
    total_details: {
      type: Object,
      require: true,
    },
    delivered: {
      type: Boolean,
      require: true,
      default: false,
    },
    delivery_date: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
