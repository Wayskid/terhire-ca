import React from "react";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { useGetOrderDetailsQuery } from "../services/appApi.js";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function OrderDetails() {
  const { order_no } = useParams();
  const { data: orderDetailsResult, error: orderDetailsError } =
    useGetOrderDetailsQuery({ order_no });

  return (
    <>
      {orderDetailsResult && (
        <div className="w-[min(50rem,100%)] mx-auto py-16 px-6">
          <div className="flex justify-between gap-2 text-center px-5">
            <div className="grid">
              <BsCheckCircle className="text-[4rem] text-main mx-auto" />
              <p className="text-2xl">Ordered</p>
              <p className="">
                {moment(orderDetailsResult.created).format("MMM Do YYYY")}
              </p>
            </div>
            <div className="w-[min(25rem,100%)] h-[2px] mt-[32px] bg-[#bcbbbb] justify-self-center"></div>
            <div className="grid">
              {orderDetailsResult.delivered ? (
                <BsCheckCircle className="text-[4rem] text-main mx-auto" />
              ) : (
                <BsCircle className="text-[4rem] text-[#bcbbbb] mx-auto" />
              )}
              <p className="text-2xl">
                Deliver{orderDetailsResult.delivered ? "ed" : "y"}
              </p>
              <p className="md:text-center ">Aug 28rd, 2023</p>
            </div>
          </div>
          <div className="mt-10">
            <div className="py-3 border-b-2 border-b-[#bcbbbb]">
              <p className="font-semibold text-xl">
                Order No. {orderDetailsResult.order_no}
              </p>
              <div className="flex justify-between pt-2">
                <p className="font-semibold text-sm text-[#4d4c4c]">
                  Total (tax incl.)
                </p>
                <p className="font-semibold">
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
                <p className="font-semibold text-[#4d4c4c]">Overseas Express</p>
                <p>
                  {new Intl.NumberFormat("en", {
                    currency: "USD",
                    style: "currency",
                  }).format(
                    orderDetailsResult.total_details.amount_shipping / 100
                  )}
                </p>
              </div>
              <p className="font-semibold text-sm text-[#4d4c4c] flex items-center">
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
                    <div className="grid self-start ml-2">
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
                      }).format(item.quantity * (item.price.unit_amount / 100))}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
            <div className="pb-3 border-b-2 border-b-[#bcbbbb]">
              <div className="flex justify-between pt-2">
                <p className="font-semibold text-[#4d4c4c]">Subtotal</p>
                <p>
                  {new Intl.NumberFormat("en", {
                    currency: "USD",
                    style: "currency",
                  }).format(orderDetailsResult.amount_subtotal / 100)}
                </p>
              </div>
              <div className="flex justify-between pt-2">
                <p className="font-semibold text-[#4d4c4c]">Tax</p>
                <p>
                  {new Intl.NumberFormat("en", {
                    currency: "USD",
                    style: "currency",
                  }).format(orderDetailsResult.total_details.amount_tax)}
                </p>
              </div>
              <div className="flex justify-between pt-2">
                <p className="font-semibold text-[#4d4c4c]">Shipping Fee</p>
                <p>
                  {new Intl.NumberFormat("en", {
                    currency: "USD",
                    style: "currency",
                  }).format(orderDetailsResult.total_details.amount_shipping)}
                </p>
              </div>
              {orderDetailsResult.total_details.amount_discount > 0 && (
                <div className="flex justify-between pt-2">
                  <p className="font-semibold text-[#4d4c4c]">Discount</p>
                  <p>
                    {new Intl.NumberFormat("en", {
                      currency: "USD",
                      style: "currency",
                    }).format(orderDetailsResult.total_details.amount_discount)}
                  </p>
                </div>
              )}
              <div className="flex justify-between pt-2">
                <p className="font-semibold text-xl">Total</p>
                <p className="text-xl">
                  {new Intl.NumberFormat("en", {
                    currency: "USD",
                    style: "currency",
                  }).format(orderDetailsResult.amount_total / 100)}
                </p>
              </div>
            </div>

            <div className="py-3 grid justify-between gap-2 md:flex">
              <div>
                <p className="text-xl font-medium pb-2">Billing Details</p>
                <div className="grid gap-1">
                  <p>{orderDetailsResult.customer_details.name}</p>
                  <p>{`${
                    orderDetailsResult.customer_details.address.line1?.length >
                    0
                      ? orderDetailsResult.customer_details.address.line1 + ","
                      : ""
                  } ${
                    orderDetailsResult.customer_details.address.city
                      ? orderDetailsResult.customer_details.address.city + ","
                      : ""
                  }`}</p>
                  <p>{`${
                    orderDetailsResult.customer_details.address.state
                      ? orderDetailsResult.customer_details.address.state + ","
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
