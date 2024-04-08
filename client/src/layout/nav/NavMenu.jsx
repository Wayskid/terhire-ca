import { BsX } from "react-icons/bs";
import { PiPlusLight, PiX, PiXLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import appContext from "../../context/AppContext";
import { useContext } from "react";

export default function NavMenu({ isNavMenuShown, setIsNavMenuShow }) {
  const { userInfo } = useContext(appContext);
  return (
    <div className="fixed w-full h-full z-50 bg-primary top-0 p-5">
      <div className="flex items-center justify-between mb-10">
        <NavLink to="/" className="logo text-4xl font-light">
          TERHIRE
        </NavLink>
        <PiXLight
          className="text-4xl cursor-pointer"
          onClick={() => setIsNavMenuShow(false)}
        />
      </div>
      <div className="px-5 grid gap-4">
        <div className="border-b-[1px] border-b-black">
          <input type="checkbox" id="accord" className="hidden peer/accord" />
          <label
            htmlFor="accord"
            className="flex justify-between items-center text-2xl mb-4 peer-checked/accord:[&>:nth-child(2)]:hidden peer-checked/accord:[&>:nth-child(3)]:grid cursor-pointer"
          >
            <p>Shop</p>
            <PiPlusLight className="peer:checked/accord:hidden text-xl" />
            <PiXLight className="hidden text-xl" />
          </label>
          <div className="grid overflow-hidden peer-checked/accord:grid-rows-1 grid-rows-[0] [transition:1s_grid-template-rows_ease]">
            <ul className="grid px-3 pb-5 gap-4 text-xl">
              <NavLink
                to="/collections"
                onClick={() => setIsNavMenuShow(false)}
              >
                Shop all Products
              </NavLink>
              <div className="">
                <input
                  type="checkbox"
                  id="accordChild"
                  className="hidden peer/accord"
                />
                <label
                  htmlFor="accordChild"
                  className="flex justify-between items-center text-xl peer-checked/accord:[&>:nth-child(2)]:hidden peer-checked/accord:[&>:nth-child(3)]:grid cursor-pointer"
                >
                  <p>Shop by Category</p>
                  <PiPlusLight className="peer:checked/accord:hidden text-xl" />
                  <PiXLight className="hidden text-xl" />
                </label>
                <div className="grid overflow-hidden peer-checked/accord:grid-rows-1 grid-rows-[0] [transition:1s_grid-template-rows_ease] ">
                  <ul className="grid px-3 pb-5 gap-3 font-light mt-4">
                    <NavLink
                      to="/collections/body_butters"
                      onClick={() => setIsNavMenuShow(false)}
                    >
                      Body Butters
                    </NavLink>
                    <NavLink
                      to="/collections/body_oils"
                      onClick={() => setIsNavMenuShow(false)}
                    >
                      Body Oils
                    </NavLink>
                    <NavLink
                      to="/collections/sample_size"
                      onClick={() => setIsNavMenuShow(false)}
                    >
                      Sample Size
                    </NavLink>
                    <NavLink
                      to="/collections/bundles"
                      onClick={() => setIsNavMenuShow(false)}
                    >
                      Bundles
                    </NavLink>
                  </ul>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <NavLink
          to="/cart"
          className="border-b-[1px] border-b-black pb-5"
          onClick={() => setIsNavMenuShow(false)}
        >
          <p className="text-2xl">Cart</p>
        </NavLink>
        <NavLink
          to="/account"
          className="border-b-[1px] border-b-black pb-5"
          onClick={() => setIsNavMenuShow(false)}
        >
          <p className="text-2xl">Account</p>
        </NavLink>
        <NavLink
          to="/about"
          className="border-b-[1px] border-b-black pb-5"
          onClick={() => setIsNavMenuShow(false)}
        >
          <p className="text-2xl">About</p>
        </NavLink>
        <NavLink
          to="/faq"
          className="border-b-[1px] border-b-black pb-5"
          onClick={() => setIsNavMenuShow(false)}
        >
          <p className="text-2xl">FAQ</p>
        </NavLink>
        {userInfo.isAdmin && (
          <NavLink
            to={`/${import.meta.env.VITE_TERHIRE_ADMIN}/admin`}
            className="border-b-[1px] border-b-black pb-5"
            onClick={() => setIsNavMenuShow(false)}
          >
            <p className="text-2xl">Admin</p>
          </NavLink>
        )}
      </div>
    </div>
  );
}
