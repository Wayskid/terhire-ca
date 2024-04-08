import React, { useContext, useEffect, useState } from "react";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  useEditOrderMutation,
  useGetOrderDetailsQuery,
} from "../../../services/appApi.js";
import AppInputSelect from "../../../components/reuseable/AppInputSelect.jsx";
import AppBtn from "../../../components/reuseable/AppBtn.jsx";
import AppDateInput from "../../../components/reuseable/AppDateInput.jsx";
import appContext from "../../../context/AppContext.jsx";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { userInfo } = useContext(appContext);
  const { order_no } = useParams();
  const [updateOrderApi, { data }] = useEditOrderMutation();
  const { data: orderDetailsResult, error: orderDetailsError } =
    useGetOrderDetailsQuery({ order_no });

  const [updateOrderVal, setUpdateOrderVal] = useState({
    status: false,
    date: "",
  });

  useEffect(() => {
    if (orderDetailsResult) {
      setUpdateOrderVal({
        status: orderDetailsResult.delivered,
        date: orderDetailsResult.order_date,
      });
    }
  }, []);

  const selection = [
    { option: "Delivered", value: true },
    { option: "Not Delivered", value: false },
  ];

  function handleUpdateOrder() {
    updateOrderApi({
      token: userInfo.token,
      user_id: userInfo._id,
      order_id: orderDetailsResult._id,
      body: updateOrderVal,
    })
      .unwrap()
      .then((res) => {
        navigate("../orders");
      });
  }

  return (
    //Add more info
    //Add link to stripe
    <>
      {orderDetailsResult && (
        <div className="p-10">
          <div className="flex mb-10 justify-between items-center">
            <p className="header text-4xl">Edit Order</p>
            <AppBtn label="All Orders" onClick={() => navigate("../orders")} />
          </div>
          <div>
            <div className="py-5 w-[min(40rem,100%)] mx-auto flex justify-between gap-2 text-center">
              <div className="grid">
                <BsCheckCircle className="text-[4rem] text-main mx-auto" />
                <p className="text-2xl font-light">Ordered</p>
                <p className="font-semibold">
                  {moment(orderDetailsResult.created).format("MMM Do YYYY")}
                </p>
              </div>
              <div
                className={`w-[min(25rem,100%)] h-[2px] mt-[32px] ${
                  orderDetailsResult.delivered ? "bg-main" : "bg-[#bcbbbb]"
                } justify-self-center`}
              ></div>
              <div className="grid">
                {orderDetailsResult.delivered ? (
                  <BsCheckCircle className="text-[4rem] text-main mx-auto" />
                ) : (
                  <BsCircle className="text-[4rem] text-[#bcbbbb] mx-auto" />
                )}
                <p className="text-2xl font-light">
                  Deliver{orderDetailsResult.delivered ? "ed" : "y"}
                </p>
                <p className="font-semibold">Aug 28rd, 2023</p>
              </div>
            </div>
            <div className="mt-10">
              <div className="py-3 border-b-2 border-b-[#bcbbbb]">
                <p className="font-semibold text-xl">
                  Order No. {orderDetailsResult.order_no}
                </p>
                <div className="flex justify-between pt-2">
                  <p className="font-semibold text-[#4d4c4c]">
                    Total (tax incl.)
                  </p>
                  <p className="font-semibold text-xl">
                    {new Intl.NumberFormat("en", {
                      currency: "USD",
                      style: "currency",
                    }).format(orderDetailsResult.amount_total / 100)}
                  </p>
                </div>
              </div>
              <div className="py-3 border-b-2 border-b-[#bcbbbb]">
                <p className="font-semibold text-xl">Delivery Method</p>
                <div className="flex justify-between pt-2">
                  <p className="font-semibold text-[#4d4c4c]">
                    Overseas Express
                  </p>
                  <p>
                    {new Intl.NumberFormat("en", {
                      currency: "USD",
                      style: "currency",
                    }).format(
                      orderDetailsResult.total_details.amount_shipping / 100
                    )}
                  </p>
                </div>
                <p className="font-semibold text-[#4d4c4c] flex items-center">
                  Expected delivery Wednesday Aug 09
                </p>
              </div>
              <div className="py-3 border-b-[1px] border-b-[#bcbbbb]">
                <p className="font-semibold text-xl">Ordered Products</p>
                <ul className="grid gap-3 pt-3">
                  {orderDetailsResult.cart_items.map((item) => (
                    <div className="flex" key={item.id}>
                      <img
                        src={item.price.product.images[0]}
                        alt={item.price.product.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="grid self-start ml-3">
                        <p className="text font-medium">
                          {item.price.product.name}
                        </p>
                        <p className="text">{item.quantity}x</p>
                        <p className="font-medium">
                          {Intl.NumberFormat("en", {
                            style: "currency",
                            currency: "USD",
                          }).format(item.price.unit_amount / 100)}
                        </p>
                      </div>
                      <p className="ml-auto">
                        {Intl.NumberFormat("en", {
                          style: "currency",
                          currency: "USD",
                        }).format(
                          item.quantity * (item.price.unit_amount / 100)
                        )}
                      </p>
                    </div>
                  ))}
                </ul>
              </div>
              <div className="mb-3 border-b-2 border-b-[#bcbbbb]">
                <div className="flex justify-between mt-3">
                  <p className="font-semibold text-[#4d4c4c]">Subtotal</p>
                  <p>
                    {new Intl.NumberFormat("en", {
                      currency: "USD",
                      style: "currency",
                    }).format(orderDetailsResult.amount_subtotal / 100)}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-semibold text-[#4d4c4c]">Tax</p>
                  <p>
                    {new Intl.NumberFormat("en", {
                      currency: "USD",
                      style: "currency",
                    }).format(orderDetailsResult.total_details.amount_tax)}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-semibold text-[#4d4c4c]">Shipping Fee</p>
                  <p>
                    {new Intl.NumberFormat("en", {
                      currency: "USD",
                      style: "currency",
                    }).format(orderDetailsResult.total_details.amount_shipping)}
                  </p>
                </div>
                {orderDetailsResult.total_details.amount_discount > 0 && (
                  <div className="flex justify-between mt-2">
                    <p className="font-semibold text-[#4d4c4c]">Discount</p>
                    <p>
                      {new Intl.NumberFormat("en", {
                        currency: "USD",
                        style: "currency",
                      }).format(
                        orderDetailsResult.total_details.amount_discount
                      )}
                    </p>
                  </div>
                )}
                <div className="flex justify-between my-2">
                  <p className="font-semibold text-xl">Total</p>
                  <p className="text-xl">
                    {new Intl.NumberFormat("en", {
                      currency: "USD",
                      style: "currency",
                    }).format(orderDetailsResult.amount_total / 100)}
                  </p>
                </div>
              </div>
              <div className="pb-3 grid justify-between gap-2 md:flex border-b-2 border-b-[#bcbbbb]">
                <div>
                  <p className="text-xl font-medium mb-2">Billing Details</p>
                  <div className="grid gap-1">
                    <p>{orderDetailsResult.customer_details.name}</p>
                    <p>{`${
                      orderDetailsResult.customer_details.address.line1
                        ?.length > 0
                        ? orderDetailsResult.customer_details.address.line1 +
                          ","
                        : ""
                    } ${
                      orderDetailsResult.customer_details.address.city
                        ? orderDetailsResult.customer_details.address.city + ","
                        : ""
                    }`}</p>
                    <p>{`${
                      orderDetailsResult.customer_details.address.state
                        ? orderDetailsResult.customer_details.address.state +
                          ","
                        : ""
                    } ${orderDetailsResult.customer_details.address.country}, ${
                      orderDetailsResult.customer_details.address.postal_code
                    }`}</p>
                    <p>
                      {orderDetailsResult.payment_method_types[0].toUpperCase()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xl font-medium pb-2">Shipping Details</p>
                  <div className="grid gap-1">
                    <p>{orderDetailsResult.shipping_details.name}</p>
                    <p>{`${orderDetailsResult.shipping_details.address.line1}, ${orderDetailsResult.shipping_details.address.city}`}</p>
                    <p>{`${orderDetailsResult.shipping_details.address.state}, ${orderDetailsResult.shipping_details.address.country}, ${orderDetailsResult.shipping_details.address.postal_code}`}</p>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <p className="text-xl font-medium mb-3">Settings</p>
                <div className="grid w-[min(17rem,100%)]">
                  <label className="font-medium mb-2" htmlFor="date">
                    Delivery Date
                  </label>
                  <AppDateInput
                    value={updateOrderVal.date * 1000}
                    onChange={(date) =>
                      setUpdateOrderVal({
                        ...updateOrderVal,
                        date: Math.floor(new Date(date).getTime() / 1000),
                      })
                    }
                  />
                </div>
                <div className="mt-4 grid">
                  <label className="font-medium mb-2" htmlFor="status">
                    Delivery Status
                  </label>
                  <AppInputSelect
                    selection={selection}
                    val={updateOrderVal.status}
                    onChange={(e) =>
                      setUpdateOrderVal({
                        ...updateOrderVal,
                        status: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-[min(40rem,100%)] mx-auto grid mt-10">
              <AppBtn label="Save Changes" onClick={handleUpdateOrder} />
            </div>
          </div>
        </div>
      )}
      {orderDetailsError && (
        <p className="text-4xl text-center text-gray-400 pt-20">
          {orderDetailsError.data}
        </p>
      )}
    </>
  );
}
