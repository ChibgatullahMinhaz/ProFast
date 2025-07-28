import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bannerImage1 from "../../assets/banner/banner1.png";
import bannerImage2 from "../../assets/banner/banner2.png";
import bannerImage3 from "../../assets/banner/banner3.png";

const slides = [bannerImage1, bannerImage2, bannerImage3];

const BannerSlider = () => {
  return (
    <div className="max-w-full lg:max-w-6xl  mx-auto px-4 mt-5">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="rounded-xl overflow-hidden"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`slide-${index}`}
              className="w-full h-auto object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
