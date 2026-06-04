import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../src/Features/LandingPage.jsx";
import Login from "../src/Features/Auth/pages/Login.jsx";
import Register from "../src/Features/Auth/pages/Register.jsx";
import Feed from "../src/Features/Post/pages/Feed.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
