import React from "react";
import logo from "../../assets/logo.png";
const GoFastLogo = ({ className }) => {
  return (
    <>
      <img src={logo} alt="GoFast logo" />
      <small className={` ${className} font-bold text-2xl -ml-5`}>GoFast</small>
    </>
  );
};

export default GoFastLogo;
