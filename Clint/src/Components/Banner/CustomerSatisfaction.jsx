import React from "react";
import bannerImage from "../../assets/location-merchant.png";
import AnimatedText from "./AnimatedText";
const CustomerSatisfaction = () => {
  return (
    <div className="bg-[#03373D] p-4 max-w-6xl my-4 text-base-100 rounded-l-2xl mx-auto bg-banner ">
      <div className="hero-content flex-col lg:flex-row">
        <div>
          <div className="text-5xl font-bold">
            <AnimatedText
              text={" Merchant and Customer Satisfaction is Our First Priority"}
            />
          </div>
          <p className="py-6 text-[#DADADA] ">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="space-x-3">
            <button className="btn bg-[#CAEB66] rounded-full outline-none border-none">
              Become a Merchant
            </button>
            <button className="btn rounded-full text-[#CAEB66]  border-2 border-[#CAEB66] hover:bg-[#B8D24B] hover:border-[#B8D24B] hover:text-black">
              Earn with Profast Courier
            </button>
          </div>
        </div>
        <img src={bannerImage} className="max-w-sm rounded-lg" />
      </div>
    </div>
  );
};

export default CustomerSatisfaction;
