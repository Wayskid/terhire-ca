import React, { useContext, useEffect, useState } from "react";
import { BsSearch, BsStar, BsStarFill } from "react-icons/bs";
import AppBtn from "../../components/reuseable/AppBtn.jsx";
import ReviewCard from "../../components/ReviewCard.jsx";
import AppInput from "../../components/reuseable/AppInput.jsx";
import { useAddReviewMutation } from "../../services/appApi";
import { useParams } from "react-router-dom";
import appContext from "../../context/AppContext.jsx";
import { useSocket } from "../../context/SocketProvider.jsx";

export default function CustomerReviews({
  reviewsResult,
  ratingTotal,
  reviewsError,
  searchVal,
  setSearchVal,
}) {
  const { userInfo } = useContext(appContext);
  const { product_name } = useParams();
  const [hover, setHover] = useState(0);

  //Add reviews
  const [addReviewShown, setAddReviewShown] = useState(false);
  const [reviewsVal, setReviewsVal] = useState({
    email: userInfo.email || "",
    message: "",
    name: userInfo.name || "",
    rating: 5,
    title: "",
  });

  //Handle input
  function handleReviewInput(e) {
    e.preventDefault();
    setReviewsVal({ ...reviewsVal, [e.target.name]: e.target.value });
  }

  //Add reviews api
  const [addReviewsApi] = useAddReviewMutation();
  const socket = useSocket();
  function handleSubmitReview(e) {
    e.preventDefault();
    addReviewsApi({
      product_name: product_name.replace(/ /g, "-"),
      body: reviewsVal,
      user_id: userInfo._id,
    })
      .unwrap()
      .then((result) => {
        socket.emit("add_review", result);
        setReviewsVal({
          email: "",
          message: "",
          name: "",
          rating: 0,
          title: "",
        });
        setAddReviewShown(false);
      });
  }

  return (
    <div className="my-20">
      <p className="header text-center text-4xl md:text-5xl mb-10">
        Customer reviews
      </p>
      <div className="grid gap-5">
        <div className="lg:flex justify-between items-center grid gap-10 justify-self-center lg:justify-self-stretch">
          {reviewsResult?.length > 0 && (
            <div className="md:pr-5 mb-10 md:mb-0 grid justify-self-center">
              <div className="flex gap-1 items-center justify-self-center">
                <p className="text-3xl mr-1">
                  {(ratingTotal / reviewsResult?.length).toFixed(1)}
                </p>
                {[...Array(5)].map((star, index) => {
                  const ratingVal = index + 1;
                  return (
                    <div key={index}>
                      <label htmlFor="star">
                        <BsStarFill
                          className={`text-2xl ${
                            ratingVal <= ratingTotal / reviewsResult?.length
                              ? "text-secondary"
                              : "text-[#cac8c8]"
                          }`}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
              <p className="font-light">
                Based on {reviewsResult?.length} Review
                {reviewsResult?.length > 1 ? "s" : ""}
              </p>
            </div>
          )}
          {userInfo._id ? (
            <AppBtn
              label="WRITE A REVIEW"
              onClick={() => setAddReviewShown(!addReviewShown)}
            />
          ) : (
            <p>Please Login to add a review</p>
          )}
        </div>
        {addReviewShown && (
          <form
            onSubmit={handleSubmitReview}
            className="grid grid-rows-[1] overflow-hidden"
          >
            <div className="grid gap-5 border-y py-5">
              <div className="grid md:flex gap-5">
                <AppInput
                  placeholder="Enter your name"
                  label="Name"
                  name="name"
                  id="name"
                  value={reviewsVal.name}
                  onChange={handleReviewInput}
                />
                <AppInput
                  placeholder="johnDoe@example.com"
                  label="Email"
                  name="email"
                  id="email"
                  value={reviewsVal.email}
                  onChange={handleReviewInput}
                />
              </div>
              <div className="justify-self-start">
                <label htmlFor="rating" className="font-medium">
                  Rating
                </label>
                <div className="flex text-3xl cursor-pointer mt-2">
                  {[...Array(5)].map((star, index) => {
                    const ratingVal = index + 1;
                    return (
                      <div key={index}>
                        <label htmlFor="star" className="cursor-pointer">
                          <BsStarFill
                            className={`${
                              ratingVal <= (hover || reviewsVal.rating)
                                ? "text-secondary"
                                : "text-[#cac8c8]"
                            }`}
                            onClick={() =>
                              setReviewsVal({
                                ...reviewsVal,
                                rating: ratingVal,
                              })
                            }
                            onMouseEnter={() => setHover(ratingVal)}
                            onMouseLeave={() => setHover(0)}
                          />
                        </label>
                        <input
                          type="radio"
                          className="hidden"
                          value={ratingVal}
                          name="star"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <AppInput
                label="Title of Review"
                placeholder="Review Title"
                name="title"
                id="title"
                value={reviewsVal.title}
                onChange={handleReviewInput}
              />
              <div className="grid">
                <label htmlFor="message" className="font-medium">
                  How was your overall experience?
                </label>
                <textarea
                  placeholder="Overall experience"
                  className="border border-black mt-3 p-3 placeholder:text-black placeholder:font-light bg-transparent"
                  rows={10}
                  name="message"
                  id="message"
                  value={reviewsVal.message}
                  onChange={handleReviewInput}
                ></textarea>
              </div>
              <div className="ml-auto">
                <AppBtn label="Submit" />
              </div>
            </div>
          </form>
        )}
        <div className="flex border items-center justify-self-center lg:justify-self-start py-1 px-3 gap-3">
          <BsSearch />
          <input
            type="text"
            className="outline-none bg-transparent"
            placeholder="Search reviews"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
        <ul className="">
          {reviewsResult &&
            reviewsResult.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          {reviewsError?.data}
        </ul>
      </div>
    </div>
  );
}
