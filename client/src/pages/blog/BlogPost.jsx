import { useParams } from "react-router-dom";
import { useGetOnePostQuery } from "../../services/appApi";
import moment from "moment";
import SubscribeForm from "../home/SubscribeForm";
import parse from "html-react-parser";

export default function BlogPost() {
  const { post_id } = useParams();
  const { data: blogPostResult, error: blogPostError } = useGetOnePostQuery({
    post_id,
  });

  return (
    <>
      {blogPostResult && (
        <div className="w-[min(73rem,100%)] mx-auto px-6 py-16 grid gap-10 mb-aut0">
          <p className="font-light">
            {moment(blogPostResult.createdAt).format("MMM Do YYYY")}
          </p>
          <p className="header text-5xl leading-10">
            {blogPostResult.post_title}
          </p>
          <img
            src="https://wildcraftcare.ca/cdn/shop/articles/thumbnail_91055c18-cdb6-416c-b516-1c2a1781bb43.jpg?v=1671561807&width=832"
            alt="blog product"
            className="w-full h-48 md:h-96 object-cover"
          />
          <p className="">{blogPostResult.post_description}</p>
          <div className="custom-content blogPost">
            {parse(blogPostResult.post_body)}
          </div>
        </div>
      )}
      {blogPostError && (
        <p className="text-4xl text-center text-gray-400 pt-20">
          {blogPostError.data}
        </p>
      )}
      <SubscribeForm />
    </>
  );
}
