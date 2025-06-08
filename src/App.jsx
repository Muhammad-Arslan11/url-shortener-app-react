import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Dashboard from "./components/pages/Dashboard";
import Link from "./components/pages/Link";
import Redirect from "./components/pages/Redirect";
import LandingPage from "./components/pages/LandingPage";
import Auth from "./components/pages/Auth";
import UrlContext from "./UrlContext";
import RequiredAuth from "./components/Required-auth";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <RequiredAuth>
            <LandingPage />
          </RequiredAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
         element: (
          <RequiredAuth>
            <Dashboard />
          </RequiredAuth>
        ),
      },
      {
        path: "/link/:id",
          element: (
          <RequiredAuth>
            <Link />
          </RequiredAuth>
        ),
      },
      {
        path: "/:id",
        element: <Redirect />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlContext>
      <RouterProvider router={router} />
    </UrlContext>
  );
}

export default App;
