import React, { useState } from "react";
import AppBtn from "../../../components/reuseable/AppBtn.jsx";
import { useGetProductsQuery } from "../../../services/appApi.js";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeleteProduct from "./DeleteProduct.jsx";
import AppLoader from "../../../components/reuseable/AppLoader.jsx";

export default function Products() {
  const [setShowMenu] = useOutletContext();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const {
    data: allProductsResult,
    isError,
    error: allProductsError,
  } = useGetProductsQuery({ filter: "", sort: "", search: searchVal });

  const [deleteMode, setDeleteMode] = useState({
    delete: false,
    idToDlt: "",
    titleToDlt: "",
  });

  return (
    <div
      className={`grid relative ${deleteMode.delete && "overflow-y-hidden"}`}
    >
      <div className="p-4 md:p-6">
        <div className="grid mb-10">
          <div className="flex items-center justify-between mb-5">
            <div
              className="burger inline-block py-3 px-1 cursor-pointer md:hidden"
              onClick={() => setShowMenu(true)}
            >
              <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
              <div className="w-[1.9rem] h-[1.5px] mb-[0.5rem] bg-black"></div>
              <div className="w-[1.9rem] h-[1.5px] bg-black"></div>
            </div>
            <p className="header text-4xl">Products</p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="w-48 border-[1px] border-black px-3 py-[0.4rem] bg-transparent"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
            <AppBtn
              label="Create New"
              onClick={() => navigate("../add_product")}
            />
          </div>
        </div>

        {allProductsResult ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
            {allProductsResult.map((product) => (
              <div className="cursor-pointer" key={product._id}>
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-full h-52 object-cover"
                  onClick={() =>
                    navigate(`/product/${product.name.replace(/ /g, "-")}`)
                  }
                />
                <p className="border-2 text-center py-2">{product.name}</p>
                <div className="flex justify-items-center [&>*]:border-2">
                  <button
                    className="py-4 text-secondary grid justify-center w-1/2 text-xl group"
                    onClick={() =>
                      navigate(`../edit/${product.name.replace(/ /g, "-")}`)
                    }
                  >
                    <MdEdit className="group-hover:scale-125 transition" />
                  </button>
                  <button
                    className="py-4 text-main grid justify-center w-1/2 text-xl group"
                    onClick={() =>
                      setDeleteMode({
                        delete: !deleteMode.delete,
                        idToDlt: product._id,
                        titleToDlt: product.title,
                      })
                    }
                  >
                    <MdDelete className="group-hover:scale-125 transition" />
                  </button>
                </div>
              </div>
            ))}
          </ul>
        ) : isError ? (
          <p className="py-10 text-center text-gray-700">
            {allProductsError.data}
          </p>
        ) : (
          <AppLoader />
        )}
      </div>
      {deleteMode.delete && (
        <DeleteProduct deleteMode={deleteMode} setDeleteMode={setDeleteMode} />
      )}
    </div>
  );
}
