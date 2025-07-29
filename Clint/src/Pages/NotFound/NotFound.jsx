import React from "react";
import errroImage from "../../assets/error.png";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import { Link } from "react-router";
const NotFound = () => {
  return (
    <div className=" max-w-[97%] mx-auto">
      <Navbar />
      <div className="flex justify-center items-center  flex-col p-2 rounded-xl my-10 bg-white">
        <img src={errroImage} alt="error image 404" />

        <Link to={"/"}>
          <button className="btn bg-[#CAEB66] outline-0 text-black border-none rounded-2xl">Back To Home</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
