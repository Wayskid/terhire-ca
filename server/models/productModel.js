import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    images: {
      type: Array,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    summary: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    pairs_with: {
      type: String,
    },
    weight: {
      type: String,
      require: true,
    },
    benefits: {
      type: Array,
      require: true,
    },
    ingredients: {
      type: Array,
      require: true,
    },
    how_to_use: {
      type: String,
      require: true,
    },
    shelf_life: {
      type: Number,
      require: true,
    },
    first_time: {
      type: String,
      require: true,
    },
    additional_info: {
      type: String,
      require: true,
    },
    in_stock: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
