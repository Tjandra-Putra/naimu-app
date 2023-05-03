import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import React from "react";

import Loader from "./components/Layout/Loader/Loader.js";

import {
  Navbar,
  Home,
  Login,
  Register,
  Cart,
  Products,
  Product,
  Orders,
  Order,
  Checkout,
  Payment,
  Footer,
  Activate,
  Profile,
} from "./routes.js";

const App = () => {
  const { loading } = useSelector((state) => state.userReducer); // getting the user state from the Redux store

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Toaster />

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />

            {/* apis */}
            <Route path="/activate/:activation_token" element={<Activate />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </React.Fragment>
  );
};

export default App;
