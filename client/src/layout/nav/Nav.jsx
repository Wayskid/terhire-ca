import { PiShoppingCartThin } from "react-icons/pi";
import { PiUserThin } from "react-icons/pi";
import AnnouncementBar from "../AnnouncementBar.jsx";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CartAside from "./CartAside.jsx";
import NavMenu from "./NavMenu.jsx";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { MdOutlineManageAccounts } from "react-icons/md";
import appContext from "../../context/AppContext.jsx";

export default function Nav() {
  const { userInfo } = useContext(appContext);
  const [isNavMenuShown, setIsNavMenuShow] = useState(false);
  const [isCartAsideShown, setIsCartAsideShow] = useState(false);
  const cart = useSelector((state) => state.app.cart);

  //Announcement bar animation
  const [scrollDistance, setScrollDistance] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollDistance(latest);
  });

  const variants = {
    initial: {
      translateY: 0,
      transition: {
        type: "easeIn",
      },
    },
    end: {
      translateY: "-48px",
      transition: {
        type: "easeIn",
      },
    },
  };

  return (
    <nav className="grid fixed z-40 top-0 w-full">
      <motion.div
        variants={variants}
        animate={scrollDistance > 150 ? "end" : "initial"}
      >
        <AnnouncementBar scrollDistance={scrollDistance} />
        <div className="flex items-center h-20 md:h-24 bg-primary">
          <div className="flex items-center justify-between px-6 md:px-10 w-[min(73rem,100%)] mx-auto">
            <NavLink
              to="/"
              className="logo text-3xl md:text-4xl font-extralight"
            >
              TERHIRE
            </NavLink>
            <div className="navLinks hidden lg:flex gap-20 font-[300] text-base">
              <NavLink to="/collections/body_butters">Body Butters</NavLink>
              <NavLink to="/collections/body_oils">Body Oils</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
            <div className="flex gap-3 items-center">
              <div className="relative">
                <PiShoppingCartThin
                  className="text-3xl cursor-pointer"
                  onClick={() => setIsCartAsideShow(!isCartAsideShown)}
                />
                {cart?.length > 0 && (
                  <span className="absolute -top-1 right-0 bg-secondary rounded-full h-4 w-4 grid place-content-center text-white font-semibold text-[10px]">
                    {cart.length}
                  </span>
                )}
              </div>
              <NavLink to="/account">
                <PiUserThin className="text-3xl lg:block" />
              </NavLink>
              {userInfo.isAdmin && (
                <NavLink to={`/${import.meta.env.VITE_TERHIRE_ADMIN}/admin`}>
                  <MdOutlineManageAccounts className="text-3xl hidden lg:block" />
                </NavLink>
              )}
              <div
                className="burger inline-block py-3 px-1 cursor-pointer lg:hidden"
                onClick={() => setIsNavMenuShow(!isNavMenuShown)}
              >
                <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
                <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
                <div className="w-[1.9rem] h-[1.5px] bg-black"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {isNavMenuShown && (
        <NavMenu
          isNavMenuShown={isNavMenuShown}
          setIsNavMenuShow={setIsNavMenuShow}
        />
      )}
      {isCartAsideShown && (
        <CartAside
          isCartAsideShown={isCartAsideShown}
          setIsCartAsideShow={setIsCartAsideShow}
        />
      )}
    </nav>
  );
}
