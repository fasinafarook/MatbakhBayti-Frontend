import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/users/HomePage";
import ContactPage from "../pages/users/ContactPage";
import AboutPage from "../pages/users/AboutPage";
import MenuPage from "../pages/users/MenuPage";
import CartPage from "../pages/users/CartPage";
import Checkout from "../pages/users/CheckOutPage";
import Orders from "../pages/users/OrdersPage";
import Details from "../pages/users/OrderDetailsPage";
import NotFound from "../pages/users/404Page";
const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<Details />} />
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </>
  );
};

export default UserRoutes;
