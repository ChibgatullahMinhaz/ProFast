import { createBrowserRouter } from "react-router";
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
        element: <BeADriver />,
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
        Component: Pricing,
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
  },
  {
    path: "/agent/dashboard",
    element: <AgentLayout />,
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    // children: [
    //   {
    //     path: "login",
    //     Component: Login,
    //   },
    //   {
    //     path: "register",
    //     Component: Register,
    //   },
    // ],
  },
  // {
  //   path: "/unauthorized",
  //   element: (
  //     <PrivateRoute>
  //       <Unauthorized />,
  //     </PrivateRoute>
  //   ),
  // },

  {
    path: "*",
    Component: NotFound,
  },
]);
