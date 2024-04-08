import Review from "../models/reviewsModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getReviews = async (req, res) => {
  try {
    const { product_name } = req.params;
    const urlName = product_name.replace(/-/g, " ");
    const product = await Product.findOne({ name: urlName });
    const { keyword } = req.query;

    const reviews = await Review.find(
      !keyword
        ? { product_id: product._id }
        : {
            product_id: product._id,
            $or: [
              {
                message: {
                  $regex: keyword,
                  $options: "i",
                },
              },
              {
                title: {
                  $regex: keyword,
                  $options: "i",
                },
              },
            ],
          }
    ).sort({ createdAt: -1 });

    if (reviews.length === 0)
      throw new Error("No reviews yet for this product");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const { customer_id, user_id } = req.params;

    //Ensure only Admin can edit product
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    const reviews = await Review.find({ user_id: customer_id });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const addReview = async (req, res) => {
  try {
    const { name, email, rating, title, message } = req.body;

    const { product_name, user_id } = req.params;
    const urlName = product_name.replace(/-/g, " ");
    const product = await Product.findOne({ name: urlName });

    const review = await Review.create({
      product_name,
      product_id: product._id,
      user_id,
      name,
      email,
      rating,
      title,
      message,
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const editReview = async (req, res) => {
  try {
    const { review_id } = req.params;

    const { name, email, rating, title, message } = req.body;

    const review = await Review.findById(review_id);

    if (name) review.name = name;

    if (email) review.email = email;

    if (rating) review.rating = rating;

    if (title) review.title = title;

    if (message) review.message = message;

    const updatedReview = await review.save();

    res.status(201).json(updatedReview);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { review_id } = req.params;

    const review = await Review.deleteOne({ _id: review_id });

    res.status(202).json(review);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const filterReviews = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { rating } = req.query;

    const reviews = await Review.find(
      !rating ? { product_id } : { product_id, rating }
    );

    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
