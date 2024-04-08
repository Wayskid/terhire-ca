import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../services/appApi.js";
import ProductCard from "../../components/ProductCard.jsx";
import AppBtn from "../../components/reuseable/AppBtn.jsx";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../components/reuseable/AppLoader.jsx";

export default function HomeShop() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("body_butters");
  const { data, isError, error } = useGetProductsQuery({
    filter,
  });

  return (
    <div className="w-[min(73rem,100%)] mx-auto my-20 px-6 md:px-12">
      <p className="header text-4xl md:text-5xl text-center mb-8">
        Shop 100% natural essentials
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 justify-around gap-5 mb-10">
        <AppBtn
          label="Body Butters"
          onClick={() => setFilter("body_butters")}
          version={filter === "body_butters" ? "activeNav" : "inActiveNav"}
        />
        <AppBtn
          label="Body Oils"
          onClick={() => setFilter("body_oils")}
          version={filter === "body_oils" ? "activeNav" : "inActiveNav"}
        />
        <AppBtn
          label="Bundles"
          onClick={() => setFilter("bundles")}
          version={filter === "bundles" ? "activeNav" : "inActiveNav"}
        />
        <AppBtn
          label="Sample Size"
          onClick={() => setFilter("sample_size")}
          version={filter === "sample_size" ? "activeNav" : "inActiveNav"}
        />
      </div>
      <div className="grid gap-10 [&>:last-child]:w-fit [&>:last-child]:mx-auto">
        {!isError && data ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7 relative ">
            {data.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ul>
        ) : isError ? (
          <p className="py-10 text-center text-4xl text-gray-600">
            {error.data}
          </p>
        ) : (
          <AppLoader />
        )}
        <AppBtn
          label={`Shop ${filter.replace("_", " ")}`}
          onClick={() => navigate(`/collections/${filter}`)}
        />
      </div>
    </div>
  );
}
