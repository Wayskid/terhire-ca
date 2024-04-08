import AppBtn from "../../components/reuseable/AppBtn.jsx";
import { useNavigate } from "react-router-dom";
import {
  PiLeafThin,
  PiHandHeartThin,
  PiPaintBucketThin,
  PiHandThin,
} from "react-icons/pi";
// import Carousel from "../../components/reuseable/Carousel.jsx";
import { useState } from "react";
import SubscribeForm from "./SubscribeForm.jsx";
// import Blog from "./Blog.jsx";
import HomeShop from "./HomeShop.jsx";

export default function Home() {
  const navigate = useNavigate();

  const [content] = useState([
    {
      title: "Terhire new must-have",
      testimony:
        "Love the texture of this serum and how easily it absorbs into the skin. I noticed a glow the second I put it on. Perfect on its own or under makeup! its own or under makeup! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, voluptas, ratione numquam quo veniam",
      name: "Ways Alabi",
      product: "Bitter Leaf",
    },
    {
      title: "New must-have",
      testimony:
        "Love the texture of this serum and how easily it absorbs into the skin. I noticed a glow the second I put it on. Perfect on its own or under makeup! its own or under makeup! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, voluptas, ratione numquam quo veniam",
      name: "Ways Alabi",
      product: "Hibiscus and Rose",
    },
    {
      title: "Must-have",
      testimony:
        "Love the texture of this serum and how easily it absorbs into the skin. I noticed a glow the second I put it on. Perfect on its own or under makeup! its own or under makeup! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, voluptas, ratione numquam quo veniam",
      name: "Ways Alabi",
      product: "Coconut Oil",
    },
  ]);

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <div className="grid md:h-[40rem] w-[min(73rem,100%)] mx-auto">
          <div className="py-24 md:pl-9 md:pr-6 text-center md:text-center self-center z-30 justify-self-center w-[min(45rem,90%)]">
            <p className="header text-[4rem] md:font-medium">
              Discover Terhire
            </p>
            <AppBtn
              label="SHOP NOW"
              version="tertiary"
              onClick={() => navigate("/collections")}
            />
          </div>
          <img
            src="https://res.cloudinary.com/diiohnshc/image/upload/v1712235029/Photoroom_20240402_215753_t0nvmp.jpg"
            className="w-full md:hidden"
            alt=""
          />
        </div>
        <img
          src="https://res.cloudinary.com/diiohnshc/image/upload/v1712235029/Photoroom_20240402_215753_t0nvmp.jpg"
          className="absolute w-full h-full object-cover z-20 md-block hidden md:block top-0 opacity-70"
          alt=""
        />
      </div>
      <div className="grid bg-[#5d695f95]">
        <div className="grid grid-cols-2 md:grid-cols-4 py-5 px-6 md:px-12 w-[min(73rem,100%)] mx-auto">
          <div className="border-r-[0.5px] border-r-gray-700 py-5 pr-5">
            <PiPaintBucketThin className="text-[4.5rem] mx-auto" />
            <p className="text-center mt-3">Small batch</p>
          </div>
          <div className="md:border-r-[0.5px] border-r-gray-700 py-5 md:pr-5">
            <PiHandHeartThin className="text-[4.5rem] mx-auto" />
            <p className="text-center mt-3">Cruelty Free</p>
          </div>
          <div className="border-r-[0.5px] border-r-gray-700 py-5 pr-5">
            <PiLeafThin className="text-[4.5rem] mx-auto" />
            <p className="text-center mt-3">Natural Ingredients</p>
          </div>
          <div className="py-5">
            <PiHandThin className="text-[4.5rem] mx-auto" />
            <p className="text-center mt-3">Handcrafted</p>
          </div>
        </div>
      </div>
      <HomeShop />
      {/* <div className="mt-20 bg-secondary">
        <div className="w-[min(73rem,100%)] mx-auto text-white py-16 md:py-20 leading-7 md:px-1">
          <p className="header text-center text-5xl leading-snug px-4">
            Over 3,300 five-star reviews
          </p>
          <Carousel content={content} />
        </div>
      </div> */}
      {/* <Blog /> */}
      <SubscribeForm />
    </div>
  );
}
