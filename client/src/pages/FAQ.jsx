import React, { useEffect, useState } from "react";
import Accordion from "../components/reuseable/Accordion.jsx";

export default function FAQ() {
  const aboutFAQ = [
    {
      qstn: "When was TERHIRE born?",
      ans: "Terhire had its inception in 2022, as Gift, the founder, initially crafted products for her family and close friends. It was officially introduced to the public in 2023.",
    },
    {
      qstn: "What does TERHIRE mean?",
      ans: "'Terhire', derived from the name 'Emeterhire', translates to 'arrival' or 'I have arrived.' It originates from the significance of 'Emeterhire', symbolizing the joyous arrival of the first female child after four male siblings, embodying the culmination of a long-awaited birth.",
    },
  ];

  const productsIngredientsFAQ = [
    {
      qstn: "Are your products suitable for all skin types?",
      ans: "Our skincare range caters to all skin types - dry, oily, combination, or normal. We understand the importance of catering to very sensitive skin, which is why we offer an unscented ima butter for those who react to essential oils. We are also working on an unscented body oil specifically designed for super sensitive skin, individuals sensitive to essential oils, and pregnant women",
    },
    {
      qstn: "Are your products suitable for all skin colors?",
      ans: "Yes ! Beauty knows no skin color.",
    },
    {
      qstn: "Tell me about storage and heat exposure",
      ans: "Our Ima Butter may melt in transit during warm weather, including hot climates like in the U.S. While the quality remains unchanged, melting can alter the texture and appearance. To solidify, refrigerate for up to 10 minutes, then return to room temperature. Avoid leaving items in the sun, hot places, cars, or outdoors. Please note, we do not offer refunds for melted items during shipping.",
    },
    {
      qstn: "Is Terhire a sustainable/eco friendly brand?",
      ans: "Certainly! Our brand is committed to sustainability and eco-friendliness. All our jars and bottles are crafted from glass, and their lids are made from bamboo. Our packaging boxes and materials are also recyclable. We are continually striving to enhance the eco-friendliness of our products.",
    },
    {
      qstn: "Are your products tested on animals?",
      ans: "Certainly not. Our products undergo testing solely with the utmost care on our family and friends.",
    },
    {
      qstn: "Are your products safe to use during pregnancy",
      ans: "Ensuring product safety during pregnancy is crucial. Since opinions on ingredient safety may differ, it's advisable to consult a healthcare practitioner for personalized guidance. Our products, crafted with natural ingredients, include 1% or less essential oil in each batch. Exceptionally, Ima butter is free of essential oils, making it suitable for use by pregnant women and children.",
    },
    {
      qstn: "How to store your TERHIRE products?",
      ans: "Store your TERHIRE products in a cool, dry place to maintain their freshness. Don't add water to the container, and handle them with clean, dry hands. Keep lids tightly sealed to preserve the quality of these all-natural items.",
    },
  ];

  const checkoutFAQ = [
    {
      qstn: "Where do I enter my discount code?",
      ans: "All Terhire products are created in Canada. You can learn more about our story and values on our About page.",
    },
    {
      qstn: "I’m trying to checkout but it won’t let me use more than one discount code. What do I do?",
      ans: "We have retail partners across Canada and the United States. See a full list of stores here.",
    },
    {
      qstn: "Where do I get more information on shipping and returns?",
      ans: "Please visit our Shipping and Returns page for a full overview of how shipping and returns work.",
    },
  ];

  return (
    <div className="mb-24">
      <Helmet>
        <title>Terhire | FAQ</title>
        <meta
          name="description"
          content="Terhire had its inception in 2022, as Gift, the founder, initially crafted products for her family and close friends. It was officially introduced to the public in 2023."
          data-rh="true"
        />
        <link rel="canonical" href="https://terhire.com/faq" />
      </Helmet>
      <div className="mb-16 h-52 md:h-60 px-2 bg-sub grid content-center">
        <p className="header text-4xl md:text-5xl text-center ">
          Frequently Asked Questions
        </p>
      </div>
      <div className="w-[min(73rem,100%)] px-6 mx-auto grid gap-32">
        <div className="">
          <p className="header text-3xl md:text-4xl text-center mb-14">About</p>
          <div className="grid gap-5">
            {aboutFAQ.map((faq, index) => (
              <Accordion
                key={index}
                id={index + faq.qstn + faq.ans}
                faq={faq}
              />
            ))}
          </div>
        </div>
        <div className="">
          <p className="header text-3xl md:text-4xl text-center mb-14">
            Products & ingredients
          </p>
          <div className="grid gap-5">
            {productsIngredientsFAQ.map((faq, index) => (
              <Accordion
                key={index}
                id={index + faq.qstn + faq.ans}
                faq={faq}
              />
            ))}
          </div>
        </div>
        <div className="">
          <p className="header text-3xl md:text-4xl text-center mb-14">
            Checkout
          </p>
          <div className="grid gap-5">
            {checkoutFAQ.map((faq, index) => (
              <Accordion
                key={index}
                id={index + faq.qstn + faq.ans}
                faq={faq}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
