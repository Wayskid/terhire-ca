import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppBtn from "../components/reuseable/AppBtn";
import AppLoader from "../components/reuseable/AppLoader";
import { BiCreditCard } from "react-icons/bi";
import { useSessionQuery } from "../services/appApi";

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data: orderSuccessResult } = useSessionQuery({
    id: searchParams.get("session_id"),
  });

  return orderSuccessResult ? (
    <div className="w-[min(40rem,100%)] mx-auto py-16 px-6">
      <div className="py-4 grid gap-3 text-center">
        <img
          src="https://res.cloudinary.com/diiohnshc/image/upload/v1697747246/Terhire/nbff5yuf4nlajlrc20jo.png"
          alt="check-mark"
          className="w-[6rem] mx-auto"
        />
        <p className="font-semibold text-xl">Order successful</p>
        <p className="px-4">
          Thank you for you order. We'll email you an order confirmation with
          details about your order.
        </p>
        <div className="grid w-3/5 mx-auto">
          <AppBtn
            label="Shop More"
            onClick={() => navigate("/collections")}
            version="tertiary"
          />
        </div>
      </div>
      <div className="mt-10">
        <div className="py-3 border-b-2 border-b-[#bcbbbb]">
          <p className="font-semibold text-xl">
            Order No. {orderSuccessResult.session.created}
          </p>
          <div className="flex justify-between pt-2">
            <p className="font-semibold text-sm text-[#4d4c4c]">
              Total (tax incl.)
            </p>
            <p className="font-semibold">
              {new Intl.NumberFormat("en", {
                currency: "USD",
                style: "currency",
              }).format(orderSuccessResult.session.amount_total / 100)}
            </p>
          </div>
        </div>
        <div className="py-3 border-b-2 border-b-[#bcbbbb]">
          <p className="font-semibold text-xl">Payment Method</p>
          <p className="pt-2 font-semibold text-sm text-[#4d4c4c] flex items-center">
            {orderSuccessResult.session.payment_method_types[0] === "card" && (
              <BiCreditCard className="text-2xl mr-2 text-main" />
            )}
            {orderSuccessResult.session.payment_method_types[0].toUpperCase()}
          </p>
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
                orderSuccessResult.session.total_details.amount_shipping / 100
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
            {orderSuccessResult.session.line_items.data.map((item) => (
              <div className="flex" key={item.price.product.metadata.id}>
                <img
                  src={item.price.product.images[0]}
                  alt={item.price.product.name}
                  className="w-14 h-14 object-cover"
                />
                <div className="grid self-start ml-2">
                  <p className="text-sm font-medium">
                    {item.price.product.name}
                  </p>
                  <p className="text-sm">{item.quantity}x</p>
                </div>
                <p className="ml-auto text-sm">
                  {Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.price.unit_amount / 100)}
                </p>
              </div>
            ))}
          </ul>
        </div>
        <div className="pb-3">
          <div className="flex justify-between pt-2">
            <p className="font-semibold text-[#4d4c4c]">Subtotal</p>
            <p>
              {new Intl.NumberFormat("en", {
                currency: "USD",
                style: "currency",
              }).format(orderSuccessResult.session.amount_subtotal / 100)}
            </p>
          </div>
          <div className="flex justify-between pt-2">
            <p className="font-semibold text-[#4d4c4c]">Tax</p>
            <p>
              {new Intl.NumberFormat("en", {
                currency: "USD",
                style: "currency",
              }).format(orderSuccessResult.session.total_details.amount_tax)}
            </p>
          </div>
          <div className="flex justify-between pt-2">
            <p className="font-semibold text-[#4d4c4c]">Shipping Fee</p>
            <p>
              {new Intl.NumberFormat("en", {
                currency: "USD",
                style: "currency",
              }).format(
                orderSuccessResult.session.total_details.amount_shipping
              )}
            </p>
          </div>
          {orderSuccessResult.session.total_details.amount_discount > 0 && (
            <div className="flex justify-between pt-2">
              <p className="font-semibold text-[#4d4c4c]">Discount</p>
              <p>
                {new Intl.NumberFormat("en", {
                  currency: "USD",
                  style: "currency",
                }).format(
                  orderSuccessResult.session.total_details.amount_discount
                )}
              </p>
            </div>
          )}
          <div className="flex justify-between pt-2">
            <p className="font-semibold text-xl">Total</p>
            <p className="text-xl">
              {new Intl.NumberFormat("en", {
                currency: "USD",
                style: "currency",
              }).format(orderSuccessResult.session.amount_total / 100)}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <AppLoader />
  );
}
