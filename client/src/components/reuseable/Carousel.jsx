import React, { useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Carousel({content}) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  function updateActiveIndex(newIndex) {
    if (newIndex < 0) newIndex = content.length - 1;
    if (newIndex >= content.length) newIndex = 0;
    setActiveIndex(newIndex);
  }

  return (
    <div className="grid mt-12 relative">
      <button
        className="absolute lg:hidden cursor-pointer z-10 self-center"
        onClick={() => updateActiveIndex(activeIndex - 1)}
      >
        <BiSolidChevronLeft className="text-4xl" />
      </button>
      <ul
        style={{ transform: `translateX(-${activeIndex}00%)` }}
        className={`flex [&>:last-child]:border-r-0 [transition:0.5s_ease] lg:-translate-x-0`}
      >
        {content.map((item, index) => (
          <div
            key={index}
            className={`min-w-full lg:min-w-[unset] lg:w-1/3 h-fit py-5`}
          >
            <div className="grid gap-5 h-min text-center">
              <p className="font-medium text-xl text-center">{item.title}</p>
              <p className="text-center w-[80%] mx-auto">"{item.testimony}"</p>
              <p className="">
                <span className="font-medium">{item.name}</span> on the{" "}
                <span
                  onClick={() =>
                    navigate(`/product/${item.product.replace(/ /g, "-")}`)
                  }
                  className="underline cursor-pointer"
                >
                  {item.product}
                </span>
              </p>
            </div>
          </div>
        ))}
      </ul>
      <button
        className="absolute lg:hidden cursor-pointer z-10 right-0 self-center"
        onClick={() => updateActiveIndex(activeIndex + 1)}
      >
        <BiSolidChevronRight className="text-4xl" />
      </button>
    </div>
  );
}
