import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <BrowserRouter>
    <AppRoutes />
    <ToastContainer position="top-right" autoClose={3000} />
  </BrowserRouter>
);

export default App;
