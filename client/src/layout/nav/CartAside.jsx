import { BsDash, BsPlus } from "react-icons/bs";
import AppBtn from "../../components/reuseable/AppBtn.jsx";
import { PiArrowRightThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQty,
  updateQtyBy,
} from "../../store/features/appSlice.js";
import { useCheckoutMutation } from "../../services/appApi.js";
import { useNavigate } from "react-router-dom";
import appContext from "../../context/AppContext.jsx";
import { useContext } from "react";

export default function CartAside({ isCartAsideShown, setIsCartAsideShow }) {
  const cart = useSelector((state) => state.app.cart);
  const dispatch = useDispatch();
  const { userInfo } = useContext(appContext);
  const navigate = useNavigate();

  const [checkoutApi, { isLoading }] = useCheckoutMutation();
  function handleCheckOut() {
    checkoutApi({ body: { user_id: userInfo._id, cart_items: cart } })
      .unwrap()
      .then((result) => (window.location.href = result.url));
  }

  console.log(cart);

  return (
    <div className="fixed w-full h-full bg-[#3b3b3aa3] top-0 z-50 flex">
      <div
        className="w-[min(62rem,100%)]"
        onClick={() => setIsCartAsideShow(false)}
      ></div>
      <div className="h-full bg-primary w-[min(28rem,100%)] ml-auto p-8 shrink-0">
        <div className="flex justify-between h-10 items-center">
          <p className="header font-light text-4xl">Your Cart</p>
          <PiArrowRightThin
            className="text-4xl"
            role="button"
            onClick={() => setIsCartAsideShow(false)}
          />
        </div>
        <div className="h-[calc(100%-260px)] overflow-auto my-4 border-b border-black grid">
          {cart.length > 0 && (
            <div className="">
              {cart.map((item) => (
                <div
                  className="grid gap-3 last:border-b-transparent"
                  key={item.id}
                >
                  <div className="border-b border-black py-3 flex gap-7">
                    <img
                      src={item.image}
                      alt=""
                      className="w-20 h-20 object-cover cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${item.name.replace(/ /g, "-")}`);
                        setIsCartAsideShow(false);
                      }}
                    />
                    <div className="grid gap-2 w-[calc(100%-6rem)] pr-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="">
                        {new Intl.NumberFormat("en", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.price)}
                      </p>
                      <div className="flex justify-between items-end">
                        <div className="flex border items-center border-black">
                          <div className="py-2 px-1 cursor-pointer">
                            <BsDash
                              onClick={() => {
                                if (item.qty > 0)
                                  dispatch(
                                    updateQty({ id: item.id, update: "Minus" })
                                  );
                              }}
                            />
                          </div>
                          <input
                            type="number"
                            min={1}
                            max={item.qty}
                            className="w-8 outline-none px-1 text-center bg-transparent"
                            value={item.qty}
                            onChange={(e) => {
                              if (
                                e.target.value <= item.in_stock &&
                                e.target.value > 0
                              ) {
                                dispatch(
                                  updateQtyBy({
                                    id: item.id,
                                    update: e.target.value,
                                  })
                                );
                              }
                            }}
                          />
                          <div className="py-2 px-1 cursor-pointer">
                            <BsPlus
                              onClick={() => {
                                if (+item.qty < item.in_stock)
                                  dispatch(
                                    updateQty({ id: item.id, update: "Add" })
                                  );
                              }}
                            />
                          </div>
                        </div>
                        <button
                          className="underline text-base font-light"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cart?.length === 0 && (
            <p className="text-center self-center text-2xl header">
              Cart is empty
            </p>
          )}
        </div>
        <div className="h-36 grid content-between">
          <div className="flex justify-between items-center">
            <p className="header text-2xl">Subtotal:</p>
            <p className="text-xl">
              {new Intl.NumberFormat("en", {
                style: "currency",
                currency: "USD",
              }).format(cart?.reduce((a, c) => a + c.qty * c.price, 0))}
            </p>
          </div>
          <AppBtn
            label={isLoading ? "CHECKING OUT..." : "CHECKOUT"}
            onClick={handleCheckOut}
          />
          <div className="mt-2 grid">
            <AppBtn
              label="CART"
              version="inActiveNav"
              onClick={() => {
                navigate("/cart");
                setIsCartAsideShow(false);
              }}
            />
          </div>
          <p className="text-sm text-center">
            Shipping, discounts, and taxes calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
