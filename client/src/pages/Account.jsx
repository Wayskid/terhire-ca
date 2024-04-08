import { useGetUserOrdersQuery } from "../services/appApi.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../components/reuseable/AppLoader.jsx";
import moment from "moment";
import appContext from "../context/AppContext.jsx";
import { useContext } from "react";
import { RemoveCookie } from "../hooks/cookies.js";

export default function Account() {
  const { setUserInfo, userInfo } = useContext(appContext);
  const dispatch = useDispatch();
  const {
    data: userOrdersResult,
    isError,
    error: userOrdersError,
  } = useGetUserOrdersQuery({
    user_email: userInfo._id,
    token: userInfo.token,
  });

  const navigate = useNavigate();

  return (
    <div className="py-16 px-6 w-[min(73rem,100%)] mx-auto">
      <p className="text-5xl header font-light mb-20">Account Information</p>
      <div>
        <div className="flex justify-between items-center mb-10">
          <p className="text-3xl header font-light ">My Orders</p>
          <p
            className="underline cursor-pointer"
            onClick={() => {
              RemoveCookie("User");
              setUserInfo({});
            }}
          >
            Logout
          </p>
        </div>
        <div className="grid gap-1 grid-cols-[2fr_1fr_1.2fr_1.2fr_0.8fr] md:grid-cols-[2fr_2fr_1fr_0.8fr_1.2fr_1.2fr_0.8fr] py-2 text-center header font-semibold text-gray-600 px-2">
          <p className="text-left">Name</p>
          <p className="hidden md:inline">Email</p>
          <p className="">Total</p>
          <p className="hidden md:inline">Paid</p>
          <p className="">Order Date</p>
          <p className="">Status</p>
          <p className="">Action</p>
        </div>
        <div className="grid [&>*]:border-b [&>*]:border-b-gray-400">
          {userOrdersResult ? (
            userOrdersResult.map((order) => (
              <div
                key={order._id}
                className={`grid gap-1 grid-cols-[2fr_1fr_1.2fr_1.2fr_0.8fr] md:grid-cols-[2fr_2fr_1fr_0.8fr_1.2fr_1.2fr_0.8fr] py-3 px-2 text-center`}
              >
                <p className="font-semibold text-left">
                  {order.customer_details.name}
                </p>
                <p className="hidden md:inline">
                  {order.customer_details.email}
                </p>
                <p className="font-medium">
                  {Intl.NumberFormat("en", {
                    style: "currency",
                    currency: "USD",
                  }).format(order.amount_total / 100)}
                </p>
                <p className="font-semibold hidden md:inline">
                  {order.payment_status.toUpperCase()}
                </p>
                <p className="">
                  {moment(order.createdAt).format("MMM Do YYYY")}
                </p>
                <p
                  className={`${
                    order.delivered ? "text-[#2ac541]" : "text-yellow-500"
                  } font-semibold`}
                >
                  {order.delivered ? "Delivered" : "Not Delivered"}
                </p>
                <p
                  className="underline cursor-pointer"
                  onClick={() => navigate(`/order/${order.order_no}`)}
                >
                  view
                </p>
              </div>
            ))
          ) : isError ? (
            <p className="py-10 text-center text-gray-700">
              {userOrdersError.data}
            </p>
          ) : (
            <AppLoader />
          )}
        </div>
      </div>
    </div>
  );
}
