import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PiHandHeartThin, PiPlant, PiPlusThin } from "react-icons/pi";
import { MdOutlineCrueltyFree } from "react-icons/md";
import { BsDash, BsPlus, BsStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import AppBtn from "../../components/reuseable/AppBtn.jsx";
import Accordion from "../../components/reuseable/Accordion.jsx";
import CustomerReviews from "./CustomerReviews.jsx";
import {
  useGetOneProductQuery,
  useGetProductReviewsQuery,
} from "../../services/appApi.js";
import { useDispatch } from "react-redux";
import { setCart } from "../../store/features/appSlice.js";
import AppLoader from "../../components/reuseable/AppLoader.jsx";

export default function SingleProduct() {
  const navigate = useNavigate();
  const { product_name } = useParams();
  const {
    data: singleProductResult,
    isError,
    error: singleProductError,
  } = useGetOneProductQuery({ product_name });

  const { data: pairsWithResult } = useGetOneProductQuery(
    {
      product_name: singleProductResult?.pairs_with,
    },
    { skip: singleProductResult?.pairs_with ? false : true }
  );

  const [activeImg, setActiveImg] = useState();

  const [qtyVal, setQtyVal] = useState(1);

  const additionalInfo = [
    {
      qstn: "How to use",
      ans: singleProductResult && singleProductResult.how_to_use,
    },
    {
      qstn: "Shelf life and product care",
      ans: `This product has a shelf life of ${
        singleProductResult && singleProductResult.shelf_life
      } months. All Terhire products are made with natural ingredients and contain no preservatives. To ensure product longevity, avoid introducing water into the container and handle with clean, dry hands. Store in a cool, dry place with lids tightly secured.`,
    },
    {
      qstn: "First time using this product?",
      ans: singleProductResult && singleProductResult.first_time,
    },
    {
      qstn: "Additional Information",
      ans: singleProductResult && singleProductResult.additional_info,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    if (singleProductResult) {
      setActiveImg(singleProductResult.images[0]);
    }
  }, [singleProductResult]);

  //Get reviews
  const [searchVal, setSearchVal] = useState("");
  const { data: reviewsResult, error: reviewsError } =
    useGetProductReviewsQuery({
      product_name: product_name.replace(/ /g, "-"),
      keyword: searchVal,
    });

  const [ratingTotal, setRatingTotal] = useState(0);
  useEffect(() => {
    if (reviewsResult) {
      setRatingTotal(
        reviewsResult.reduce((a, c) => {
          return a + c.rating;
        }, 0)
      );
    }
  }, [reviewsResult]);

  return (
    <>
      {singleProductResult ? (
        <div className="w-[min(73rem,100%)] mx-auto px-6 py-16">
          <p className="font-light gap-3 items-center mb-5">
            <NavLink to="/" className="underline mr-3">
              Home
            </NavLink>
            &#62;
            <NavLink to="/collections" className="underline mx-3">
              All Products
            </NavLink>
            &#62;
            <span className="ml-3">{singleProductResult.name}</span>
          </p>
          <div className="grid md:grid-cols-2 items-start gap-7">
            <div className="mt-5 md:hidden">
              <p className="header text-4xl lg:text-5xl leading-[1.1em] mb-2">
                {singleProductResult.name}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-medium">{singleProductResult.title}</p>
                <div className="flex text-2x items-center">
                  {reviewsResult?.length > 0 &&
                    [...Array(5)].map((star, index) => {
                      const ratingVal = index + 1;
                      return (
                        <div key={index}>
                          <label htmlFor="star">
                            <BsStarFill
                              className={`${
                                ratingVal <= ratingTotal / reviewsResult?.length
                                  ? "text-secondary"
                                  : "text-[#cac8c8]"
                              }`}
                            />
                          </label>
                        </div>
                      );
                    })}
                  <p className="text-base ml-2">{reviewsResult?.length}</p>
                </div>
              </div>
            </div>
            <div>
              <img src={activeImg} alt="" className="mb-4 w-full" />
              <div className="grid grid-cols-4 justify-between gap-5">
                {singleProductResult.images.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt=""
                    className={`cursor-pointer w-full h-24 object-cover ${
                      img === activeImg ? "opacity-1" : "opacity-50"
                    }`}
                    onClick={() => setActiveImg(img)}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-8">
              <div className="hidden md:block">
                <p className="header text-4xl lg:text-[2.7rem] leading-[1.1em] mb-2">
                  {singleProductResult.name}
                </p>
                <div className="flex justify-between">
                  <p className="font-medium">{singleProductResult.title}</p>
                  <div className="flex text-2x items-center">
                    {reviewsResult?.length > 0 &&
                      [...Array(5)].map((star, index) => {
                        const ratingVal = index + 1;
                        return (
                          <div key={index}>
                            <label htmlFor="star">
                              <BsStarFill
                                className={`${
                                  ratingVal <=
                                  ratingTotal / reviewsResult?.length
                                    ? "text-secondary"
                                    : "text-[#cac8c8]"
                                }`}
                              />
                            </label>
                          </div>
                        );
                      })}
                    <p className="text-base ml-2">{reviewsResult?.length}</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="">
                  <p className="text-3xl">
                    {new Intl.NumberFormat("en-Us", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      singleProductResult.price *
                        ((100 - singleProductResult.discount) / 100).toFixed(2)
                    )}{" "}
                    CAD
                  </p>
                  {singleProductResult.discount > 0 && (
                    <div className="flex gap-3 items-center">
                      <p className="line-through text-[#626161] text-xl">
                        {new Intl.NumberFormat("en-Us", {
                          style: "currency",
                          currency: "USD",
                        }).format(singleProductResult.price)}{" "}
                        CAD
                      </p>
                      <p className="text-main font-semibold px-2 py-1 rounded-md border border-main">
                        -{singleProductResult.discount}%
                      </p>
                    </div>
                  )}
                </div>
                <p className="">{singleProductResult.summary}</p>
                <p className="font-light">{singleProductResult.description}</p>
              </div>
              <div className="">
                <p className="mb-2 font-medium">Quantity</p>
                <div className="flex items-center border border-black px-4 py-2 w-fit md:ml-0 text-xl gap-1">
                  <BsDash
                    className="cursor-pointer"
                    onClick={() => {
                      if (qtyVal > 1) setQtyVal(+qtyVal - 1);
                    }}
                  />
                  <input
                    type="number"
                    className="w-20 outline-none p-1 text-center bg-transparent"
                    value={qtyVal}
                    onChange={(e) =>
                      setQtyVal(
                        e.target.value <= singleProductResult.in_stock
                          ? e.target.value
                          : 1
                      )
                    }
                  />
                  <BsPlus
                    className="cursor-pointer"
                    onClick={() => {
                      if (qtyVal < singleProductResult.in_stock)
                        setQtyVal(+qtyVal + 1);
                    }}
                  />
                </div>
              </div>
              <AppBtn
                label="ADD TO CART"
                onClick={() => {
                  dispatch(
                    setCart({
                      id: singleProductResult._id,
                      title: singleProductResult.title,
                      name: singleProductResult.name,
                      category: singleProductResult.category,
                      image: singleProductResult.images[0],
                      in_stock: singleProductResult.in_stock,
                      price:
                        singleProductResult.price *
                        ((100 - singleProductResult.discount) / 100).toFixed(2),
                      qty: qtyVal <= singleProductResult.in_stock ? qtyVal : 1,
                    })
                  );
                }}
              />
              {pairsWithResult && (
                <div className="bg-primary md:p-5">
                  <p className="header text-3xl mb-4">Pairs Well With</p>
                  <div className="grid justify-between items-center gap-4">
                    <div
                      className="flex gap-5 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/product/${
                            pairsWithResult &&
                            pairsWithResult.name.replace(/ /g, "-")
                          }`
                        )
                      }
                    >
                      <img
                        src={pairsWithResult && pairsWithResult.images[0]}
                        alt={pairsWithResult && pairsWithResult.name}
                        className="w-28 h-28 object-cover"
                      />
                      <div className="grid gap-1 items-center">
                        <p className="font-medium">
                          {pairsWithResult && pairsWithResult.name}
                        </p>
                        <p className="font-light">
                          {pairsWithResult &&
                            pairsWithResult.summary?.substring(0, 60)}
                          {pairsWithResult?.summary?.length > 60 && "..."}
                        </p>
                        <p className="font-medium">
                          {pairsWithResult &&
                            new Intl.NumberFormat("en-Us", {
                              style: "currency",
                              currency: "USD",
                            }).format(
                              pairsWithResult.price *
                                (
                                  (100 - pairsWithResult.discount) /
                                  100
                                ).toFixed(2)
                            )}{" "}
                          CAD
                        </p>
                      </div>
                    </div>
                    <AppBtn
                      label="ADD TO CART"
                      onClick={() => {
                        pairsWithResult &&
                          dispatch(
                            setCart({
                              id: pairsWithResult._id,
                              title: pairsWithResult.title,
                              name: pairsWithResult.name,
                              category: pairsWithResult.category,
                              image: pairsWithResult.images[0],
                              in_stock: pairsWithResult.in_stock,
                              price:
                                pairsWithResult.price *
                                (
                                  (100 - pairsWithResult.discount) /
                                  100
                                ).toFixed(2),
                              qty:
                                qtyVal <= pairsWithResult.in_stock ? qtyVal : 1,
                            })
                          );
                      }}
                    />
                  </div>
                </div>
              )}
              <div>
                <p className="font-medium mb-6">Additional Information</p>
                <div className="grid gap-5">
                  <div className="border-b-[1px] border-b-black pb-4">
                    <input
                      type="checkbox"
                      id="ingredients"
                      className="hidden peer/accordion"
                    />
                    <label
                      htmlFor="ingredients"
                      className="grid grid-cols-[1fr_0.15fr] justify-between items-center cursor-pointer peer-checked/accordion:[&>*:last-child]:rotate-[45deg]"
                    >
                      <p className="text-base">Ingredients</p>
                      <PiPlusThin className="text-3xl justify-self-end transition-all" />
                    </label>
                    <div className="grid grid-rows-[0] overflow-hidden peer-checked/accordion:grid-rows-1">
                      <p className="text-base font-light mt-5 mb-3 translate-all whitespace-pre-wrap">
                        {singleProductResult?.ingredients.map(
                          (ingredient, index) => (
                            <span key={index}>
                              {ingredient}
                              {index !==
                              singleProductResult?.ingredients.length - 1
                                ? ", "
                                : "."}
                            </span>
                          )
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-black pb-4">
                    <input
                      type="checkbox"
                      id="benefits"
                      className="hidden peer/accordion"
                    />
                    <label
                      htmlFor="benefits"
                      className="grid grid-cols-[1fr_0.15fr] justify-between items-center cursor-pointer peer-checked/accordion:[&>*:last-child]:rotate-[45deg]"
                    >
                      <p className="text-base">Benefits</p>
                      <PiPlusThin className="text-3xl justify-self-end transition-all" />
                    </label>
                    <div className="grid grid-rows-[0] overflow-hidden peer-checked/accordion:grid-rows-1">
                      <p className="text-base font-light mt-5 mb-3 translate-all whitespace-pre-wrap">
                        {singleProductResult?.benefits.map((benefit, index) => (
                          <span key={index}>
                            {benefit}
                            {index !== singleProductResult?.benefits.length - 1
                              ? ", "
                              : "."}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  {additionalInfo.map((accord, index) => (
                    <Accordion key={index} id={index} faq={accord} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <CustomerReviews
            reviewsResult={reviewsResult}
            ratingTotal={ratingTotal}
            reviewsError={reviewsError}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
          />
        </div>
      ) : isError ? (
        <p className="py-10 text-center text-gray-700">
          {singleProductError.data}
        </p>
      ) : (
        <AppLoader />
      )}
    </>
  );
}
