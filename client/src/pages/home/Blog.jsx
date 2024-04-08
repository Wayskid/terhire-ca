import React from "react";
import { useGetPostsQuery } from "../../services/appApi";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function Blog() {
  const navigate = useNavigate();
  const { data: blogResult, error: blogError, isLoading } = useGetPostsQuery();
  return (
    <div className="bg-primary">
      <div className="grid p-6 md:p-12 gap-5 w-[min(73rem,100%)] mx-auto">
        <p className="header text-center text-5xl">Terhire Blog</p>
        {/* <p className="py-10 text-center text-2xl text-gray-700">Blog coming soon</p> */}
        <p className="text-center">Everyday skincare tips</p>
        <ul className="grid gap-10 mt-10 md:grid-cols-3">
          {blogResult
            ? blogResult.map((post) => (
                <li key={post._id} className="grid gap-2 self-start">
                  <img
                    src="https://wildcraftcare.ca/cdn/shop/articles/thumbnail_91055c18-cdb6-416c-b516-1c2a1781bb43.jpg?v=1671561807&width=832"
                    alt="blog product"
                    className="w-full h-48 md:h-80 object-cover"
                  />
                  <p className="font-light">
                    {moment(post.createdAt).format("MMM Do YYYY")}
                  </p>
                  <p className="header text-xl font-semibold leading-10">
                    {post.post_title}
                  </p>
                  <p className="">{post.post_description}</p>
                  <button
                    onClick={() => navigate(`/blog/${post._id}`)}
                    className="underline mr-auto font-light"
                  >
                    Read Article
                  </button>
                </li>
              ))
            : isLoading && <p>Loading</p>}
        </ul>
      </div>
    </div>
  );
}
