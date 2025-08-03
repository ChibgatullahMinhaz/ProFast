import React, { useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../../Shared/Footer/Footer";
import { CircularProgress } from "@mui/material";

const MainLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timing = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timing);
  }, [location]);
  return (
    <div className=" max-w-[97%] mx-auto">
      <Navbar />
      <main>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <CircularProgress color="primary" size={50} />
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
