import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    post_title: {
      type: String,
      require: true,
    },
    post_summary: {
      type: String,
      require: true,
    },
    post_body: {
      type: String,
      require: true,
    },
    post_image: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
