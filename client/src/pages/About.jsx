import { Helmet } from "react-helmet-async";
export default function About() {
  return (
    <div>
      <Helmet>
        <title>Terhire | About Us</title>
        <meta
          name="description"
          content="Terhire is rooted in steadfast commitment: to provide a holistic and
          natural experience, through effective formulations, using the finest
          and potent ingredients."
          data-rh="true"
        />
        <link rel="canonical" href="https://terhire.com/about" />
      </Helmet>
      {/* <div className="grid relative md:h-[40rem]">
        <div className="z-30 grid w-[min(73rem,100%)] mx-auto">
          <p className="header py-24 md:text-5xl text-4xl text-center md:text-left self-center z-30 justify-self-center md:justify-self-start w-[min(25rem,90%)] pl-6 md:pl-11">
            Naturally effective skincare for naturally beautiful results
          </p>
          <img
            src="https://wildcraftcare.ca/cdn/shop/files/wildcraft-products-make-up-bag-mobile.jpg?v=1659648482&width=900"
            className="w-full md:hidden"
            alt=""
          />
        </div>
        <img
          src="https://wildcraftcare.ca/cdn/shop/files/wildcraft-products-make-up-bag.jpg?v=1659648332&width=1920"
          className="absolute w-full h-full object-cover z-20 md-block hidden md:block"
          alt=""
        />
      </div> */}
      <div className="bg-sub">
        <div className="w-[min(73rem,100%)] pt-20 px-6 md:px-10 mx-auto">
          <p className="lg:text-3xl text-4xl mb-10">Our Mission</p>
          <p className="text-base font-light">
            Terhire is rooted in steadfast commitment: to provide a holistic and
            natural experience, through effective formulations, using the finest
            and potent ingredients. Our aim is to deliver visible and tangible
            results with colorful creations derived from plants and herbs.
          </p>
        </div>
        <div className="w-[min(73rem,100%)] py-20 px-6 md:px-10 mx-auto">
          <p className="lg:text-3xl text-4xl mb-10">Our Story</p>
          <p className="text-base font-light">
            Terhire, where the essence of arrival is not just a name but a story
            of love, heritage, and the transformative power of nature. Born in
            2023 from the vision of Gift, Terhire draws inspiration from the
            Urhobo tribe of Africa, meaning 'arrival' and echoing the sentiment
            of 'finally, girls have arrived.'
            <br />
            <br />
            At the heart of Terhire lies a tribute to Gift's mother, Emeterhire,
            whose timeless recipes blended locally-sourced, naturally-made Shea
            butter with oils to nurture skin and hair. Emeterhire's dedication
            went beyond mere beauty; she crafted remedies for eczema, injuries,
            and sunspots, ensuring her children received the best care.
            <br />
            <br />
            As Gift ventured into creating her own natural skincare during the
            pandemic in 2020, her mother's encouragement became a beacon. Gift's
            journey, guided by her belief in nature's profound impact on the
            mind and body, led to the founding of a small business in her home
            country. With her mother's unwavering support, Gift's success story
            included a leap to Canada. <br />
            <br />
            Terhire is not just a skincare brand; it's a commitment to making
            nature's treasures accessible. We believe in the serenity that comes
            from embracing simplicity, wellness, and balance. Beyond non-toxic
            beauty, Terhire invites you to experience the beauty of a radiant
            spirit nurtured by nature.
            <br />
            <br />
            Our vision extends beyond skincare; we aspire to position Nigeria
            and the broader African continent at the forefront of the natural,
            simple, and sustainable beauty industry. Choose Terhire, and let
            your journey to glowing skin be a celebration of self-respect and
            harmony with the world we inhabit.
          </p>
        </div>
      </div>
      {/* <div className="grid lg:grid-cols-2 mx-auto bg-sub">
        <div className="grid content-center w-[min(33rem,90%)] lg:justify-self-end justify-self-center py-20 pr-6">
          <p className="lg:text-3xl text-4xl mb-10">Our Story</p>
          <p className="text-base font-light">
            Terhire, where the essence of arrival is not just a name but a story
            of love, heritage, and the transformative power of nature. Born in
            2023 from the vision of Gift, Terhire draws inspiration from the
            Urhobo tribe of Africa, meaning 'arrival' and echoing the sentiment
            of 'finally, girls have arrived.'
            <br />
            <br />
            At the heart of Terhire lies a tribute to Gift's mother, Emeterhire,
            whose timeless recipes blended locally-sourced, naturally-made Shea
            butter with oils to nurture skin and hair. Emeterhire's dedication
            went beyond mere beauty; she crafted remedies for eczema, injuries,
            and sunspots, ensuring her children received the best care.
            <br />
            <br />
            As Gift ventured into creating her own natural skincare during the
            pandemic in 2020, her mother's encouragement became a beacon. Gift's
            journey, guided by her belief in nature's profound impact on the
            mind and body, led to the founding of a small business in her home
            country. With her mother's unwavering support, Gift's success story
            included a leap to Canada. <br />
            <br />
            Terhire is not just a skincare brand; it's a commitment to making
            nature's treasures accessible. We believe in the serenity that comes
            from embracing simplicity, wellness, and balance. Beyond non-toxic
            beauty, Terhire invites you to experience the beauty of a radiant
            spirit nurtured by nature.
            <br />
            <br />
            Our vision extends beyond skincare; we aspire to position Nigeria
            and the broader African continent at the forefront of the natural,
            simple, and sustainable beauty industry. Choose Terhire, and let
            your journey to glowing skin be a celebration of self-respect and
            harmony with the world we inhabit.
          </p>
        </div>
        <img
          src="https://wildcraftcare.ca/cdn/shop/files/wildcraft-founder-laura-whitaker.png?v=1688678676&width=1470"
          alt=""
          className="lg:w-full lg:h-full object-cover"
        />
      </div> */}
    </div>
  );
}
