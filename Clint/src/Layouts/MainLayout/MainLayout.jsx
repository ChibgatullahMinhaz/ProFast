import React from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className=" max-w-[97%] mx-auto">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
