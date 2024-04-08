import AppBtn from "./reuseable/AppBtn.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../store/features/appSlice.js";
import { useState } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart);
  const [secondPic, setSecondPic] = useState(false);
  return (
    <li className="grid relative">
      {product.discount > 0 && product.in_stock > 0 && (
        <p className="absolute top-1 right-1 text-white font-light text-xl bg-main px-2 py-1 z-10">
          {product.discount}%
        </p>
      )}
      {product.in_stock < 1 && (
        <p className="absolute top-1 right-1 text-white font-light bg-main px-2 py-1 z-10">
          Sold Out
        </p>
      )}
      <div
        className="h-[17rem] bg-secondary relative"
        onMouseEnter={() => setSecondPic(true)}
        onMouseLeave={() => setSecondPic(false)}
      >
        {product.images.length > 1 && (
          <img
            src={product.images[1]}
            alt={product.name}
            className={`w-full h-full object-cover  cursor-pointer absolute ${
              secondPic ? "opacity-1" : "opacity-0"
            } transition duration-500`}
            onClick={() =>
              navigate(`/product/${product.name.replace(/ /g, "-")}`)
            }
          />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover cursor-pointer ${
            product.images.length > 1 && secondPic ? "opacity-0" : "opacity-1"
          } transition duration-500`}
          onClick={() =>
            navigate(`/product/${product.name.replace(/ /g, "-")}`)
          }
        />
      </div>
      <div
        className="px-1 my-3 grid text-center justify-center cursor-pointer"
        onClick={() => navigate(`/product/${product.name.replace(/ /g, "-")}`)}
      >
        <p className="title text-base font-medium">{product.name}</p>
        <p className="name text-base font-light">{product.title}</p>
      </div>
      <AppBtn
        label={
          cart?.find((item) => item.name === product.name)
            ? `ADD MORE ${new Intl.NumberFormat("en-Us", {
                style: "currency",
                currency: "USD",
              }).format(
                product.price * ((100 - product.discount) / 100).toFixed(2)
              )}`
            : `ADD TO CART ${new Intl.NumberFormat("en-Us", {
                style: "currency",
                currency: "USD",
              }).format(
                product.price * ((100 - product.discount) / 100).toFixed(2)
              )}`
        }
        version="neutral"
        onClick={() => {
          dispatch(
            setCart({
              id: product._id,
              title: product.title,
              name: product.name,
              category: product.category,
              image: product.images[0],
              in_stock: product.in_stock,
              price:
                product.price * ((100 - product.discount) / 100).toFixed(2),
              qty: 1,
            })
          );
        }}
      />
    </li>
  );
}
