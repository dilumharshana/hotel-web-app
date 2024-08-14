import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { Offers } from "./pages/Offers";
import CustomerSignUp from "./pages/CustomerSignUp";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/offers",
      element: <Offers/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <CustomerSignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}
