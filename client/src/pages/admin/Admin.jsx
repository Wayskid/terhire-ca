import { useState } from "react";
import { BsX } from "react-icons/bs";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function Admin() {
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  function matchRoute(route) {
    if (pathname === route) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="grid md:grid-cols-[1fr_4fr] fixed h-full w-full">
      <div
        className={`bg-sub h-full border-r-[1px] border-r-gray-300 p-5 absolute md:[position:unset] z-10 md:translate-x-0 flex flex-col items-start ${
          showMenu ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <p className="header text-4xl">Admin</p>
          <BsX
            className="text-4xl md:hidden cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <div className="grid">
          <NavLink
            to={`/${import.meta.env.VITE_TERHIRE_ADMIN}/admin`}
            onClick={() => setShowMenu(false)}
            className={`py-3 text-xl ${
              matchRoute("/terhire290823/admin") && "font-semibold"
            }`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="products"
            onClick={() => setShowMenu(false)}
            className={`py-3 text-xl ${
              matchRoute("/terhire290823/admin/products") && "font-semibold"
            }`}
          >
            Products
          </NavLink>
          <NavLink
            to="orders"
            onClick={() => setShowMenu(false)}
            className={`py-3 text-xl ${
              matchRoute("/terhire290823/admin/orders") && "font-semibold"
            }`}
          >
            Orders
          </NavLink>
          <NavLink
            to="blog"
            onClick={() => setShowMenu(false)}
            className={`py-3 text-xl ${
              matchRoute("/terhire290823/admin/blog") && "font-semibold"
            }`}
          >
            Blog
          </NavLink>
        </div>
        <NavLink
          to="/"
          onClick={() => setShowMenu(false)}
          className="mt-auto text-xl"
        >
          Exit Panel
        </NavLink>
      </div>
      <div className="h-full grid overflow-y-scroll">
        <Outlet context={[setShowMenu]} />
      </div>
    </div>
  );
}
