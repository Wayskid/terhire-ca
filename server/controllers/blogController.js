import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import upload from "../config/cloudinary.js";

export const getPosts = async (req, res) => {
  try {
    //Get all posts
    const posts = await Blog.find({}).sort({ createdAt: -1 });
    if (posts.length === 0) throw new Error("No post found");
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getPostDetails = async (req, res) => {
  try {
    const { post_id } = req.params;

    //Get post details
    const post = await Blog.findById(post_id);

    if (!post) throw new Error("Sorry we cannot find this post");

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const addNewPost = async (req, res) => {
  try {
    const { post_title, post_summary, post_body, post_image } = req.body;

    // Ensure only Admin can add new post
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    //Upload images
    // let postImages;
    // if (post_image) {
    //   const imageResponse = await upload(post_image);
    //   postImages = imageResponse.map((image) => image.secure_url);
    // }

    //Add new post
    const newPost = await Blog.create({
      post_title,
      post_summary,
      post_body,
      // post_image: postImages,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { user_id, post_id } = req.params;

    // Ensure only Admin can add new post
    const user = await User.findById(user_id);
    if (!user || !user.isAdmin) throw new Error("Forbidden");

    //Delete post
    const post = await Blog.deleteOne({ _id: post_id });

    res.status(202).json(post);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
