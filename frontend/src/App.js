import { BrowserRouter, Routes, Route } from "react-router-dom";

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
} from "./routes.js";

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

        {/* apis */}
        <Route path="/activate/:activation_token" element={<Activate />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
