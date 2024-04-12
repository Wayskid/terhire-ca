import React, { useEffect } from "react";
import ProductCard from "../../../components/ProductCard.jsx";
import { useGetProductsQuery } from "../../../services/appApi.js";
import { useOutletContext } from "react-router-dom";
import AppLoader from "../../../components/reuseable/AppLoader.jsx";

export default function SampleSize() {
  const [sortVal, setHeaderText, setFilterVal] = useOutletContext();

  const {
    data: sampleSizeResult,
    isError,
    error: sampleSizeError,
  } = useGetProductsQuery({
    filter: "sample_size",
    sort: sortVal,
  });

  useEffect(() => {
    setHeaderText({
      head: "Shop Sample Size",
      text: "All-over natural nourishment to give your entire body an indulgent self-care experience.",
    });
    setFilterVal("sample_size");
  }, []);

  return (
    <>
      <Helmet>
        <title>Terhire | SHOP Sample Size</title>
        <meta
          name="description"
          content="All-over natural nourishment to give your entire body an indulgent self-care experience."
          data-rh="true"
        />
        <link rel="canonical" href="https://terhire.com/sample_size" />
      </Helmet>
      {sampleSizeResult ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7 items-start">
          {sampleSizeResult.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      ) : isError ? (
        <p className="text-4xl text-center text-gray-400 pt-20">
          {sampleSizeError.data}
        </p>
      ) : (
        <AppLoader />
      )}
    </>
  );
}
