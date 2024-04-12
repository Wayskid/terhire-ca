import React, { useEffect } from "react";
import ProductCard from "../../../components/ProductCard.jsx";
import { useGetProductsQuery } from "../../../services/appApi.js";
import { useOutletContext } from "react-router-dom";
import AppLoader from "../../../components/reuseable/AppLoader.jsx";
import { Helmet } from "react-helmet-async";

export default function Bundles() {
  const [sortVal, setHeaderText, setFilterVal] = useOutletContext();

  const {
    data: bundlesResult,
    isError,
    error: bundlesError,
  } = useGetProductsQuery({
    filter: "bundles",
    sort: sortVal,
  });

  useEffect(() => {
    setHeaderText({
      head: "Shop Bundles",
      text: "All-over natural nourishment to give your entire body an indulgent self-care experience.",
    });
    setFilterVal("bundles");
  }, []);

  return (
    <>
      <Helmet>
        <title>Terhire | SHOP Bundles</title>
        <meta
          name="description"
          content="All-over natural nourishment to give your entire body an indulgent self-care experience."
          data-rh="true"
        />
        <link rel="canonical" href="https://terhire.com/bundles" />
      </Helmet>
      {bundlesResult ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7 items-start">
          {bundlesResult.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      ) : isError ? (
        <p className="text-4xl text-center text-gray-400 pt-20">
          {bundlesError.data}
        </p>
      ) : (
        <AppLoader />
      )}
    </>
  );
}
