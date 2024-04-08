import { useEffect, useState } from "react";
import AppInputSelect from "../../components/reuseable/AppInputSelect.jsx";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Collections() {
  const navigate = useNavigate();
  const [sortVal, setSortVal] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [headerText, setHeaderText] = useState({
    head: "Shop All Products",
    text: "100% natural products to elevate your everyday wellness rituals.",
  });

  const sortArray = [
    {
      option: "Featured",
      value: "Featured",
    },
    {
      option: "Alphabetically A-Z",
      value: "Alphabetically_A-Z",
    },
    {
      option: "Alphabetically Z-A",
      value: "Alphabetically_Z-A",
    },
    {
      option: "Price Low-High",
      value: "Price_Low-High",
    },
    {
      option: "Price High-Low",
      value: "Price_High-Low",
    },
    {
      option: "Date New-Old",
      value: "Date_New-Old",
    },
    {
      option: "Date Old-New",
      value: "Date_Old-New",
    },
  ];

  const filterArray = [
    {
      option: "All Products",
      value: "/collections",
    },
    {
      option: "Body Butters",
      value: "body_butters",
    },
    {
      option: "Body Oils",
      value: "body_oils",
    },
    {
      option: "Sample Size",
      value: "sample_size",
    },
    {
      option: "Bundles",
      value: "bundles",
    },
  ];

  useEffect(() => {
    if (filterVal) navigate(filterVal);
  }, [filterVal]);

  return (
    <div className="">
      <div className="mb-16 py-5 md:py-10 px-2 bg-sub grid content-center text-center">
        <p className="header text-3xl md:text-4xl">{headerText.head}</p>
        <p className="font-light text-[14px] md:text-base w-[min(60rem,100%)] mx-auto">
          {headerText.text}
        </p>
      </div>
      <div className="my-16 grid md:grid-cols-[0.25fr_1fr] w-[min(73rem,100%)] mx-auto px-6 md:px-10">
        <div className=" justify-self-start hidden md:block text-xl">
          <p className="font-medium mb-5">Categories</p>
          <ul className="grid gap-2">
            <NavLink to="/collections" activeclassname="active">
              All Products
            </NavLink>
            <NavLink to="body_butters" activeclassname="active">
              Body Butters
            </NavLink>
            <NavLink to="body_oils" activeclassname="active">
              Body Oils
            </NavLink>
            <NavLink to="sample_size" activeclassname="active">
              Sample Size
            </NavLink>
            <NavLink to="bundles" activeclassname="active">
              Bundles
            </NavLink>
          </ul>
        </div>
        <div className="grid self-start">
          <div className="flex justify-between md:justify-end">
            <div className="mb-5 justify-self-end items-center md:hidden">
              <p className="mr-3">Filter by:</p>
              <AppInputSelect
                selection={filterArray}
                val={filterVal}
                onChange={(e) => setFilterVal(e.target.value)}
              />
            </div>
            <div className="mb-5 md:flex justify-self-end items-center">
              <p className="w-[40%]">Sort by:</p>
              <AppInputSelect
                selection={sortArray}
                onChange={(e) => setSortVal(e.target.value)}
              />
            </div>
          </div>
          <Outlet context={[sortVal, setHeaderText, setFilterVal]} />
        </div>
      </div>
    </div>
  );
}
