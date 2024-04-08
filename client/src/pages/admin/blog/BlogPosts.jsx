import React, { useContext } from "react";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../../services/appApi.js";
import { useNavigate, useOutletContext } from "react-router-dom";
import moment from "moment";
import AppLoader from "../../../components/reuseable/AppLoader.jsx";
import appContext from "../../../context/AppContext.jsx";
import AppBtn from "../../../components/reuseable/AppBtn.jsx";

export default function BlogPosts() {
  const [setShowMenu] = useOutletContext();
  const navigate = useNavigate();
  const { userInfo } = useContext(appContext);
  const [deleteApi, { isLoading: deleting }] = useDeletePostMutation();
  const {
    data: blogResult,
    isError,
    error: blogError,
    isLoading,
  } = useGetPostsQuery();

  return (
    <div className="p-4 md:p-6">
      <div className="grid md:flex md:items-center md:justify-between mb-5">
        <div className="flex items-center justify-between mb-5 md:mb-0">
          <div
            className="burger inline-block py-3 px-1 cursor-pointer md:hidden"
            onClick={() => setShowMenu(true)}
          >
            <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
            <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
            <div className="w-[1.9rem] h-[1.5px] bg-black"></div>
          </div>
          <p className="header text-4xl">Posts</p>
        </div>
        <div className="flex gap-2 justify-between items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="w-40 md:w-[unset] border-[1px] border-black px-3 py-[0.4rem] bg-transparent"
            // value={searchVal}
            // onChange={(e) => setSearchVal(e.target.value)}
          />
          <AppBtn label="Create New" onClick={() => navigate("../add_post")} />
        </div>
      </div>

      <div className="">
        <div className="grid gap-1 grid-cols-[1fr_1.5fr_1fr_0.8fr] py-2 text-center header font-semibold text-gray-600 px-2">
          <p className="">Title</p>
          <p className="">Summary</p>
          <p className="">Date</p>
          <p className="">Action</p>
        </div>
        <div className="grid [&>*]:border-b [&>*]:border-b-gray-400">
          {blogResult ? (
            blogResult.map((post) => (
              <div
                key={post._id}
                className={`grid gap-1 grid-cols-[1fr_1.5fr_1fr_0.8fr] py-3 px-2 text-center items-center`}
              >
                <p
                  className="font-semibold text-center cursor-pointer"
                  onClick={() => navigate(`../../blog/${post._id}`)}
                >
                  {post.post_title.slice(0, 20) + "..."}
                </p>
                <p className="">{post.post_summary.slice(0, 20) + "..."}</p>
                <p className="">
                  {moment(post.createdAt).format("MMM Do YYYY")}
                </p>
                <p
                  className="underline cursor-pointer"
                  onClick={() =>
                    deleteApi({
                      token: userInfo.token,
                      user_id: userInfo._id,
                      post_id: post._id,
                    })
                  }
                >
                  delete
                </p>
              </div>
            ))
          ) : isError ? (
            <p className="py-10 text-center text-gray-700">{blogError.data}</p>
          ) : (
            <AppLoader />
          )}
        </div>
      </div>
      {/* <div className="grid sm:flex items-center justify-center justify-items-center h-full">
        <p className="text-center text-5xl text-gray-600">Blog coming soon</p>
      </div> */}
    </div>
  );
}
