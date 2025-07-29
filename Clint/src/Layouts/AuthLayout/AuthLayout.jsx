import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <>
      <Navbar />
     <main className="my-10">
         <Outlet />
     </main>

      <Footer />
    </>
  );
};

export default AuthLayout;
