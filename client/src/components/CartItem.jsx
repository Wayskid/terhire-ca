import { useState } from "react";
import { BsDash, BsPlus, BsX } from "react-icons/bs";
import {
  removeFromCart,
  updateQty,
  updateQtyBy,
} from "../store/features/appSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <li className="border-b-[1px] border-black grid py-3 md:grid-cols-[1.8fr_1fr_1fr_0.5fr] md:justify-items-center items-center gap-5 md:gap-0">
      <div
        className="flex items-center  md:justify-self-start w-full cursor-pointer"
        onClick={() => navigate(`/product/${item.name.replace(/ /g, "-")}`)}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-24 object-cover "
        />
        <p className="ml-5 text-xl">Glowing cream </p>
      </div>
      <div className="flex md:grid md:grid-cols-2 md:justify-items-center w-full items-center">
        <p className="w-24 md:w-fit">
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: "USD",
          }).format(item.price)}
        </p>
        <div className="flex items-center border border-black ml-5 md:ml-0">
          <div className="py-3 px-2 cursor-pointer">
            <BsDash
              onClick={() => {
                if (item.qty > 0)
                  dispatch(updateQty({ id: item.id, update: "Minus" }));
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
              if (e.target.value <= item.in_stock && e.target.value > 0) {
                dispatch(
                  updateQtyBy({
                    id: item.id,
                    update: e.target.value,
                  })
                );
              }
            }}
          />
          <div className="py-3 px-2 cursor-pointer">
            <BsPlus
              onClick={() => {
                if (item.qty <= item.in_stock)
                  dispatch(updateQty({ id: item.id, update: "Add" }));
              }}
            />
          </div>
        </div>
      </div>
      <p className="hidden md:grid">
        {new Intl.NumberFormat("en", {
          style: "currency",
          currency: "USD",
        }).format(item.price * item.qty)}
      </p>
      <BsX
        className="text-2xl"
        role="button"
        onClick={() => dispatch(removeFromCart(item.id))}
      />
    </li>
  );
}
