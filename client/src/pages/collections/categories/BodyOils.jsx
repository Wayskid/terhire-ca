import React, { useEffect } from "react";
import ProductCard from "../../../components/ProductCard.jsx";
import { useGetProductsQuery } from "../../../services/appApi.js";
import { useOutletContext } from "react-router-dom";
import AppLoader from "../../../components/reuseable/AppLoader.jsx";
import { Helmet } from "react-helmet-async";

export default function BodyOils() {
  const [sortVal, setHeaderText, setFilterVal] = useOutletContext();
  const {
    data: bodyOilsResult,
    isError,
    error: bodyOilsError,
  } = useGetProductsQuery({
    filter: "body_oils",
    sort: sortVal,
  });

  useEffect(() => {
    setHeaderText({
      head: "Body Oils",
      text: "Plant-powered formulas to nourish your complexion for a healthy-looking, radiant glow.",
    });
    setFilterVal("body_oils");
  }, []);

  return (
    <>
      <Helmet>
        <title>Terhire | SHOP Body Oils</title>
        <meta
          name="description"
          content="Plant-powered formulas to nourish your complexion for a healthy-looking, radiant glow."
          data-rh="true"
        />
        <link rel="canonical" href="https://terhire.com/body_oils" />
      </Helmet>
      {bodyOilsResult ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7 items-start">
          {bodyOilsResult.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      ) : isError ? (
        <p className="text-4xl text-center text-gray-400 pt-20">
          {bodyOilsError.data}
        </p>
      ) : (
        <AppLoader />
      )}
    </>
  );
}
