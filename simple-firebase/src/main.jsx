import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./components/Home/Home.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
         {
            path: "/",
            element: <Home></Home>,
         },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
