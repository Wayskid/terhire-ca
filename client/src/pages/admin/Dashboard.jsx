import React, { useState } from "react";
// import AppBtn from "../../../components/reuseable/AppBtn.jsx";
// import { useGetProductsQuery } from "../../../services/appApi.js";
// import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate, useOutletContext } from "react-router-dom";
// import DeleteProduct from "./DeleteProduct.jsx";

export default function Dashboard() {
  const [setShowMenu] = useOutletContext();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");

  return (
    <div className="relative">
      <div className="p-6">
        <div
          className="burger inline-block py-3 px-1 cursor-pointer md:hidden"
          onClick={() => setShowMenu(true)}
        >
          <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
          <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
          <div className="w-[1.9rem] h-[1.5px] bg-black"></div>
        </div>
        <div className="grid sm:flex mb-10 items-center justify-center justify-items-center h-full">
          <p className="text-center text-5xl py-40 text-gray-600">
            Dashboard coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
