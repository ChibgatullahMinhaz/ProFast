import React from "react";
import BannerSlider from "../../Components/Banner/BannerSlider";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import OurServices from "../../Components/OurServices/OurServices";
import SalesTeamsSection from "../../Components/SalesTeamsSection/SalesTeamsSection";
import ServiceCards from "../../Components/ServiceCards/ServiceCards";
import CustomerSatisfaction from "../../Components/Banner/CustomerSatisfaction";
import TestimonialCarousel from "../../Components/Testimonial/Testimonial";
import Accordion from "../../Components/Accordion/Accordion";

const Home = () => {
  return (
    <>
      <BannerSlider />
      <HowItWorks />
      <OurServices />
      <SalesTeamsSection />
      <ServiceCards />
      <CustomerSatisfaction />
      <TestimonialCarousel />
      <Accordion />
    </>
  );
};

export default Home;
