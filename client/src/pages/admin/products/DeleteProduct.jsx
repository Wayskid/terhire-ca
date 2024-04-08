import React, { useContext } from "react";
import AppBtn from "../../../components/reuseable/AppBtn";
import { useDeleteProductMutation } from "../../../services/appApi";
import { useSelector } from "react-redux";
import appContext from "../../../context/AppContext";
import { useSocket } from "../../../context/SocketProvider";

export default function DeleteProduct({ deleteMode, setDeleteMode }) {
  const socket = useSocket();
  const { userInfo } = useContext(appContext);
  const [deleteProductApi] = useDeleteProductMutation();
  return (
    <div className="absolute w-full md:h-full h-screen top-0 bg-[#7b7a7a66] grid">
      <div className="w-[min(25rem,100%)] bg-secondary text-white grid gap-5 p-5 text-center fixed justify-self-center self-center">
        <p className="font-semibold text-xl">
          Are you sure you want to delete this product?
        </p>
        <p className="">
          <span className="text-[#f73838] font-bold">
            {deleteMode.titleToDlt}
          </span>{" "}
          will be deleted permanently. You cannot undo this action.
        </p>
        <div className="flex justify-center gap-5">
          <button
            className="bg-white text-black py-3 px-5"
            onClick={() =>
              setDeleteMode({
                delete: false,
                idToDlt: "",
                titleToDlt: "",
              })
            }
          >
            Cancel
          </button>
          <button
            className="bg-[#ea2b2b] px-5"
            onClick={() => {
              if (deleteMode.delete === true) {
                deleteProductApi({
                  token: userInfo.token,
                  user_id: userInfo._id,
                  product_id: deleteMode.idToDlt,
                })
                  .unwrap()
                  .then((result) => {
                    socket.emit("delete_product", result);
                  });
                setDeleteMode({
                  delete: false,
                  idToDlt: "",
                  titleToDlt: "",
                });
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
