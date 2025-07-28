import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Landing from "../Pages/landingPage/Landing";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Coverage from "../Pages/Coverege/Coverege";

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
]);
