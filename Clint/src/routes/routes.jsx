import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Landing from "../Pages/landingPage/Landing";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Coverage from "../Pages/Coverege/Coverege";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import RiderLayout from "../Layouts/RiderLayout/RiderLayout";
import UserLayouts from "../Layouts/CustomerLayout/UserLayouts";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";

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
        element: <Landing />,
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
        Component: Coverage,
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
    path: "/rider/dashboard",
    element: <RiderLayout />,
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

  // {
  //   path: "*",
  //   Component: NotFound,
  // },
]);
