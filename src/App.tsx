import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { Offers } from "./pages/Offers";
import CustomerSignUp from "./pages/CustomerSignUp";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/NavBar";
import CustomerPanel from "./pages/CustomerPanel";
import { Reservations } from "./components/Reservations";
import HomeLanding from "./pages/HomeLanding";

// Simulated authentication check
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return localStorage.getItem("customer_data") !== null;
};

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLanding />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <CustomerSignUp />
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/admin",
          element: <AdminDashboard />
        },
        {
          path: "/home",
          element: <CustomerPanel services={[]} offers={[]} />
        },
        {
          path: "/reservations",
          element: <Reservations services={[]} offers={[]} />
        }
      ]
    }
  ]);

  return (
    <>
      <Navbar title="ABC Restaurant" />
      <RouterProvider router={router} />
    </>
  );
}
