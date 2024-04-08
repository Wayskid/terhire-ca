import React, { useContext, useState } from "react";
import { useGetOrdersQuery } from "../../../services/appApi.js";
import AppInputSelect from "../../../components/reuseable/AppInputSelect.jsx";
import moment from "moment";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import AppLoader from "../../../components/reuseable/AppLoader.jsx";
import appContext from "../../../context/AppContext.jsx";

export default function Orders() {
  const [setShowMenu] = useOutletContext();
  const { userInfo } = useContext(appContext);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const selection = [
    { option: "All orders", value: "" },
    { option: "Delivered", value: true },
    { option: "Not Delivered", value: false },
  ];
  const [filterBy, setFilterBy] = useState("");
  const { data: ordersResults, error: ordersError } = useGetOrdersQuery({
    user_id: userInfo._id,
    token: userInfo.token,
    filter_by: filterBy,
  });

  return (
    <div className="p-4 md:p-6">
      <div className="grid mb-10">
        <div className="flex items-center justify-between mb-5">
          <div
            className="burger inline-block py-3 px-1 cursor-pointer md:hidden"
            onClick={() => setShowMenu(true)}
          >
            <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
            <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
            <div className="w-[1.9rem] h-[1.5px] bg-black"></div>
          </div>
          <p className="header text-4xl">Orders</p>
        </div>
        <div className="flex justify-between gap-2">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="w-40 md:w-[unset] border-[1px] border-black px-3 py-[0.4rem] bg-transparent"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <AppInputSelect
            onChange={(e) => setFilterBy(e.target.value)}
            selection={selection}
            val={filterBy}
          />
        </div>
      </div>
      <div className="">
        <div className="grid gap-1 grid-cols-[2fr_1fr_1.2fr_1.2fr_0.8fr] md:grid-cols-[2fr_2fr_1fr_0.8fr_1.2fr_1.2fr_0.8fr] py-2 text-center header font-semibold text-gray-600 px-2">
          <p className="text-left">Name</p>
          <p className="hidden md:inline">Email</p>
          <p className="">Total</p>
          <p className="hidden md:inline">Paid</p>
          <p className="">Order Date</p>
          <p className="">Status</p>
          <p className="">Action</p>
        </div>
        <div className="grid [&>*]:border-b [&>*]:border-b-gray-400">
          {ordersResults ? (
            ordersResults.map((order) => (
              <div
                key={order._id}
                className={`grid gap-1 grid-cols-[2fr_1fr_1.2fr_1.2fr_0.8fr] md:grid-cols-[2fr_2fr_1fr_0.8fr_1.2fr_1.2fr_0.8fr] py-3 px-2 text-center items-center`}
              >
                <p className="font-semibold text-left">
                  {order.customer_details.name}
                </p>
                <p className="hidden md:inline">
                  {order.customer_details.email}
                </p>
                <p className="font-medium">
                  {Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "USD",
                  }).format(order.amount_total / 100)}
                </p>
                <p className="font-semibold hidden md:inline">
                  {order.payment_status.toUpperCase()}
                </p>
                <p className="">
                  {moment(order.createdAt).format("MMM Do YYYY")}
                </p>
                <p
                  className={`${
                    order.delivered ? "text-[#2ac541]" : "text-error"
                  } font-semibold`}
                >
                  {order.delivered ? "Delivered" : "Not Delivered"}
                </p>
                <button
                  className="underline cursor-pointer"
                  onClick={() => navigate(`../order_info/${order.order_no}`)}
                >
                  view
                </button>
              </div>
            ))
          ) : (
            <AppLoader />
          )}
        </div>
      </div>
    </div>
  );
}
