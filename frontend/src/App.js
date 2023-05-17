import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import React from "react";
import { PersistGate } from "redux-persist/integration/react"; // import PersistGate
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { store, persistor } from "./redux/store.js";
import Loader from "./components/Layout/Loader/Loader.js";
import ProtectedRoute from "./routes/protectedRoutes.js";
import { server } from "./server.js";

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
  Refunds,
  Addresses,
  PasswordChange,
  NotFound,
} from "./routes/routes.js";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = React.useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`${server}/payment/stripe-api-key`);
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    store.dispatch(loadUser()); // syntax is typically used when you're dispatching an action from outside of a React component (e.g. from a Redux thunk/middleware).
    getStripeApiKey();
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Toaster />
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Navbar />

          <Routes>
            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  </ProtectedRoute>
                }
              />
            )}

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/refunds"
              element={
                <ProtectedRoute>
                  <Refunds />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addresses"
              element={
                <ProtectedRoute>
                  <Addresses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password-change"
              element={
                <ProtectedRoute>
                  <PasswordChange />
                </ProtectedRoute>
              }
            />

            <Route path="/activate/:activation_token" element={<Activate />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </PersistGate>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
