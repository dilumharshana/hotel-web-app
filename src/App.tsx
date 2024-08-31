import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { Offers } from "./pages/Offers";
import CustomerSignUp from "./pages/CustomerSignUp";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/NavBar";
import CustomerPanel from "./pages/CustomerPanel";
import { Reservations } from "./components/Reservations";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>
    },
    {
      path: "/offers",
      element: <Offers />
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
  ]);

  return (
    <>
      <Navbar title="Ocen View Hotel" />
      <RouterProvider router={router} />
    </>
  );
}
