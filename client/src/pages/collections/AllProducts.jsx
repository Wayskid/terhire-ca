import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard.jsx";
import { useGetProductsQuery } from "../../services/appApi.js";
import { useOutletContext } from "react-router-dom";
import AppLoader from "../../components/reuseable/AppLoader.jsx";
import { Helmet } from "react-helmet-async";

export default function AllProducts() {
  const [sortVal, setHeaderText] = useOutletContext();
  const search = "";
  const {
    data: allProductsResult,
    isError,
    error: allProductsError,
  } = useGetProductsQuery({ filter: "", sort: sortVal, search });

  useEffect(() => {
    setHeaderText({
      head: "Shop All Products",
      text: "100% natural products to elevate your everyday wellness rituals.",
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Terhire | Shop All Products</title>
        <meta
          name="description"
          content="100% natural products to elevate your everyday wellness rituals."
          data-rh="true"
        />
        <link rel="canonical" href="https://terhire.com/collections" />
      </Helmet>
      {allProductsResult ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
          {allProductsResult.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      ) : isError ? (
        <p className="text-4xl text-center text-gray-400 pt-20">
          {allProductsError.data}
        </p>
      ) : (
        <AppLoader />
      )}
    </>
  );
}
