import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addNewPost,
  deletePost,
  getPostDetails,
  getPosts,
} from "../controllers/blogController.js";

const blogRoute = express.Router();

//Get all posts
blogRoute.get("/", getPosts);

//Get post details
blogRoute.get("/post/:post_id", getPostDetails);

//Create post
blogRoute.post("/create/:user_id", verifyToken, addNewPost);

//Delete post
blogRoute.delete("/delete/:user_id/:post_id", verifyToken, deletePost);

export default blogRoute;
