import { lazy, Suspense, useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SingleProduct from "./pages/singleProduct/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";
import Collections from "./pages/collections/Collections.jsx";
import AllProducts from "./pages/collections/AllProducts.jsx";
import BodyButters from "./pages/collections/categories/BodyButters.jsx";
import BodyOils from "./pages/collections/categories/BodyOils.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import FAQ from "./pages/FAQ.jsx";
import ShippingReturns from "./pages/Shipping&Returns.jsx";
import Contact from "./pages/Contact.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import Home from "./pages/home/Home.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import Products from "./pages/admin/products/Products.jsx";
import Orders from "./pages/admin/order/Orders.jsx";
import EditProduct from "./pages/admin/products/EditProduct.jsx";
import AddProduct from "./pages/admin/products/AddProduct.jsx";
import OrderInfo from "./pages/admin/order/OrderInfo.jsx";
import Success from "./pages/Success.jsx";
import appContext from "./context/AppContext.jsx";
import BlogPost from "./pages/blog/BlogPost.jsx";
import BlogPosts from "./pages/admin/blog/BlogPosts.jsx";
import Layout from "./layout/Layout.jsx";
import { useLocation } from "react-router-dom";
import AddPost from "./pages/admin/blog/AddPost.jsx";
import SampleSize from "./pages/collections/categories/SampleSize.jsx";
import Bundles from "./pages/collections/categories/Bundles.jsx";
import AppLoader from "./components/reuseable/AppLoader.jsx";

function App() {
  const { token, isAdmin } = useContext(appContext).userInfo;
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  const Admin = lazy(() => import("./pages/admin/Admin.jsx"));

  return (
    <div className="App h-full">
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="collections" element={<Collections />}>
              <Route index element={<AllProducts />}></Route>
              <Route path="body_butters" element={<BodyButters />}></Route>
              <Route path="body_oils" element={<BodyOils />}></Route>
              <Route path="sample_size" element={<SampleSize />}></Route>
              <Route path="bundles" element={<Bundles />}></Route>
            </Route>
            <Route
              path="product/:product_name"
              element={<SingleProduct />}
            ></Route>
            <Route path="order/:order_no" element={<OrderDetails />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route
              path="login"
              element={token ? <Navigate to="/account" /> : <Login />}
            ></Route>
            <Route
              path="sign_up"
              element={token ? <Navigate to="/" /> : <SignUp />}
            ></Route>
            <Route
              path="account"
              element={token ? <Account /> : <Navigate to="/login" />}
            ></Route>
            <Route path="faq" element={<FAQ />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route
              path="shipping_returns"
              element={<ShippingReturns />}
            ></Route>
            <Route path="contact" element={<Contact />}></Route>
            <Route path="success" element={<Success />}></Route>
            <Route path="blog/:post_id" element={<BlogPost />}></Route>
          </Route>
          <Route
            path={`${import.meta.env.VITE_TERHIRE_ADMIN}/admin`}
            element={
              token && isAdmin === true ? <Admin /> : <Navigate to="/" />
            }
          >
            <Route index element={<Dashboard />}></Route>
            <Route path="products" element={<Products />}></Route>
            <Route path="add_product" element={<AddProduct />}></Route>
            <Route path="edit/:product_name" element={<EditProduct />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="order_info/:order_no" element={<OrderInfo />}></Route>
            <Route path="blog" element={<BlogPosts />}></Route>
            <Route path="add_post" element={<AddPost />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
