import React, { useEffect } from "react";
import ProductCard from "../../../components/ProductCard.jsx";
import { useGetProductsQuery } from "../../../services/appApi.js";
import { useOutletContext } from "react-router-dom";
import AppLoader from "../../../components/reuseable/AppLoader.jsx";
import { Helmet } from "react-helmet-async";

export default function BodyButters() {
  const [sortVal, setHeaderText, setFilterVal] = useOutletContext();

  const {
    data: bodyButtersResult,
    isError,
    error: bodyButtersError,
  } = useGetProductsQuery({
    filter: "body_butters",
    sort: sortVal,
  });

  useEffect(() => {
    setHeaderText({
      head: "Body Butters",
      text: "Unveil the essence of African body care with Terhire’s handcrafted body butters, elegantly presented in biodegradable bamboo covers and frosted glass packaging. Sourced directly from local women entrepreneurs in Nigeria and Ghana, our formulation includes premium cocoa and Shea butter. Immerse yourself in a rejuvenating ritual, embracing the richness and nourishment of these traditional ingredients while empowering communities.",
    });
    setFilterVal("body_butters");
  }, []);

  return (
    <>
      <Helmet>
        <title>Terhire | SHOP Body Butters</title>
        <meta
          name="description"
          content="Unveil the essence of African body care with Terhire’s handcrafted body butters, elegantly presented in biodegradable bamboo covers and frosted glass packaging. Sourced directly from local women entrepreneurs in Nigeria and Ghana, our formulation includes premium cocoa and Shea butter. Immerse yourself in a rejuvenating ritual, embracing the richness and nourishment of these traditional ingredients while empowering communities."
          data-rh="true"
        />
        <link rel="canonical" href="https://terhire.com/body_butters" />
      </Helmet>
      {bodyButtersResult ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7 items-start">
          {bodyButtersResult.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      ) : isError ? (
        <p className="text-4xl text-center text-gray-400 pt-20">
          {bodyButtersError.data}
        </p>
      ) : (
        <AppLoader />
      )}
    </>
  );
}
