import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Coverage from "../Pages/Coverege/Coverege";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import UserLayouts from "../Layouts/CustomerLayout/UserLayouts";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import AgentLayout from "../Layouts/RiderLayout/AgentLayout";
import NotFound from "../Pages/NotFound/NotFound";
import BeADriver from "../Pages/BeADriver/BeADriver";
import Pricing from "../Pages/CalculatePrice/Pricing";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import PrivateRoute from "./PrivetRoute";
import UserDashboardHome from "../Dashboard/CustomerSide/Pages/UserDashboardHome";
import SendParcel from "../Pages/SendParcel/SendParcel";
import MyParcels from "../Dashboard/CustomerSide/MyParcels/MyParcels";
import ParcelDetails from "../Dashboard/CustomerSide/Pages/parcelDetails/ParcelDetails";
import Payments from "../Dashboard/CustomerSide/Pages/PaymentsSystem/Payments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "beRider",
        element: (
          <PrivateRoute>
            <BeADriver />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "services",
        Component: Coverage,
      },
      {
        path: "pricing",
        element: (
          <PrivateRoute>
            <Pricing />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/admin/dashboard",
    element: <AdminLayout></AdminLayout>,
  },
  {
    path: "/user/dashboard",
    element: <UserLayouts></UserLayouts>,
    children: [
      {
        index: true,
        element: <UserDashboardHome />,
      },
      {
        path: "customer/book-parcel",
        element: <SendParcel />,
        loader: () => fetch("/serviceCenter.json"),
      },
      {
        path: "customer/my-bookings",
        element: <MyParcels />,
      },
      {
        path: "parcel/Details/:id",
        element: <ParcelDetails />,
      },
      {
        path: "pay/for/parcel/:id",
        element: <Payments />,
      },
    ],
  },
  {
    path: "/agent/dashboard",
    element: <AgentLayout />,
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: (
      <PrivateRoute>
        <Unauthorized />,
      </PrivateRoute>
    ),
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
