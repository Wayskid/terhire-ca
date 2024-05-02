import React, { useContext } from "react";
import CartItem from "../components/CartItem.jsx";
import AppBtn from "../components/reuseable/AppBtn.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCheckoutMutation } from "../services/appApi.js";
import appContext from "../context/AppContext.jsx";

export default function Cart() {
  const { cart } = useSelector((state) => state.app);
  const { userInfo } = useContext(appContext);
  const navigate = useNavigate();

  const [checkoutApi] = useCheckoutMutation();
  function handleCheckOut() {
    checkoutApi({ body: { user_id: userInfo._id, cart_items: cart } })
      .unwrap()
      .then((result) => (window.location.href = result.url));
  }

  return (
    <div className="py-16 px-6 w-[min(73rem,100%)] mx-auto grid content-start">
      <p className="text-4xl md:text-5xl header">Shopping cart</p>
      <ul className="py-5">
        {cart.length > 0 && (
          <div className=" grid-cols-[1.8fr_1fr_1fr_0.5fr] justify-items-center my-8 hidden md:grid">
            <p className="font-medium  justify-self-start">Product</p>
            <div className="grid grid-cols-2 justify-items-center w-full items-center">
              <p className="font-medium ">Price</p>
              <p className="font-medium ">Qty</p>
            </div>
            <p className="font-medium ">Subtotal</p>
            <p className="font-medium ">Option</p>
          </div>
        )}
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
        {cart.length === 0 && (
          <p className="h-20 my-auto text-center mt-10 text-2xl header">
            Cart is empty
          </p>
        )}
      </ul>
      <div className="grid self-start mt-10 ml-auto">
        <p className="mb-2">
          Sub Total:{" "}
          <span className="font-medium text-[18px]">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "USD",
            }).format(cart.reduce((a, c) => a + c.qty * c.price, 0))}{" "}
            CAD
          </span>
        </p>
        <div className="flex gap-2">
          <AppBtn
            label="Update"
            version="neutral"
            onClick={() => navigate("/collections")}
          />
          {cart.length > 0 && (
            <AppBtn label="Checkout" onClick={handleCheckOut} />
          )}
        </div>
      </div>
    </div>
  );
}
