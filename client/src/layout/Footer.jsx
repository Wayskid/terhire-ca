import { BsWhatsapp, BsInstagram, BsTiktok } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="grid justify-items-center bg-main text-white">
      <div className="w-[min(73rem,100%)] px-6 md:px-12 py-16">
        <div className="pb-16 grid grid-cols-2 lg:grid-cols-3 gap-[4rem_0rem] lg:gap-0 justify-items-center items-center">
          <div className="lg:justify-self-start [grid-column:1/-1] lg:[grid-column:1/1]">
            <p className="text-4xl mb-4 font-light">TERHIRE</p>
            <div className="flex justify-center gap-5 text-2xl">
              {/* <Link to="/collections"><BsWhatsapp /></Link> */}
              <Link to="https://www.tiktok.com/@terhireskin?is_from_webapp=1&sender_device=pc">
                <BsTiktok />
              </Link>
              <Link to="https://www.instagram.com/terhireskin?igsh=MW42d2x6enRyamt2OQ==">
                <BsInstagram />
              </Link>
            </div>
          </div>
          <div className="links self-start">
            <p className="font-medium mb-5">Shop</p>
            <div className="links grid gap-3">
              <Link to="/collections">All Products</Link>
              <Link to="/collections/body_butter">Body Butters</Link>
              <Link to="/collections/body_oils">Body Oils</Link>
            </div>
          </div>
          <div className="links">
            <p className="font-medium mb-5">Pages</p>
            <div className="links grid gap-3">
              <Link to="/about">About Us</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/shipping_returns">Shipping and Returns</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
        <div className="pt-16 border-t-[1px] border-t-white">
          <p className="text-center">
            Embrace the soothing essence of 'Terhire', a name inspired by my
            mother, and embark on a journey to discover the beauty of simplicity
            in skincare, where every small-batch product is carefully crafted
            with natural ingredients to offer deep hydration and a holistic,
            liberating experience for all skin types.
          </p>
          <p className="mt-5 text-center">&copy; Copyright 2023 - TERHIRE</p>
        </div>
      </div>
    </footer>
  );
}
