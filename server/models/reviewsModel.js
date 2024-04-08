import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    product_id: {
      type: String,
      require: true,
    },
    product_name: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
      default: "Guest"
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
