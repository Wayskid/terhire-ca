import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getReviews,
  addReview,
  deleteReview,
  filterReviews,
  getUserReviews,
} from "../controllers/reviewsController.js";

const reviewsRoute = express.Router();

//Get product reviews
reviewsRoute.get("/:product_name", getReviews);

//Get user reviews
reviewsRoute.get("/history/:customer_id/:user_id", getUserReviews);

//Add review
reviewsRoute.post("/add/:product_name/:user_id", addReview);

//Delete review
reviewsRoute.delete("/delete/:reviewId", verifyToken, deleteReview);

//Filter review
reviewsRoute.get("/filter/:product_id", verifyToken, filterReviews);

export default reviewsRoute;
