import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/users/HomePage";
import ContactPage from "../pages/users/ContactPage";
import AboutPage from "../pages/users/AboutPage";
import MenuPage from "../pages/users/MenuPage";


const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />

      </Routes>
    </>
  );
};

export default UserRoutes;
