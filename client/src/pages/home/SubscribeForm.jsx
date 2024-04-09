import React, { useState } from "react";
import { useSubscribeUserMutation } from "../../services/appApi";

export default function SubscribeForm() {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeUserApi, { isLoading, error }] = useSubscribeUserMutation();
  const [showThanks, setShowThanks] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (subscribeEmail)
      subscribeUserApi({ email: subscribeEmail })
        .unwrap()
        .then((result) => {
          setShowThanks(true);
          setSubscribeEmail("");
        })
        .catch(() => setShowThanks(false));
  }
  return (
    <form className="bg-sub">
      <div className="grid p-6 md:p-12 lg:flex lg:gap-20 w-[min(73rem,100%)] mx-auto">
        <div className="mb-9">
          <p className="header text-4xl md:text-5xl mb-6">
            Sign up and save 10%
          </p>
          <p className="">
            Plus be the first to know about promotions, discounts, launches,
            giveaways, and much more.
          </p>
        </div>
        {!showThanks ? (
          <div className="grid md:flex my-auto gap-4">
            <input
              className="px-[0.5rem] py-1 bg-transparent border-[1px] border-black focus:border-black placeholder:text-black placeholder:font-light outline-none"
              id="subscribeEmail"
              name="subscribeEmail"
              type="email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              placeholder="Email Address"
            />
            {error?.data === "Already subscribed" && (
              <p className="font-semibold">Already subscribed</p>
            )}
            <button
              className={`px-6 py-2 tracking-[0.125rem] uppercase border-[1px] [transition:0.6s_ease] disabled:pointer-events-none disabled:opacity-40 bg-secondary border-transparent hover:text-black
            hover:border-black text-white hover:bg-transparent text-sm mr-auto`}
              disabled={!subscribeEmail.length}
              onClick={handleSubscribe}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        ) : (
          <div className="">
            <p className="font-semibold">THANKS FOR SUBSCRIBING</p>
            <p className="">Check your email for a confirmation message</p>
          </div>
        )}
      </div>
    </form>
  );
}
