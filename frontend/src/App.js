import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Layout/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Footer from "./components/Layout/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Orders from "./pages/Orders/Orders";
import Order from "./pages/Order/Order";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
