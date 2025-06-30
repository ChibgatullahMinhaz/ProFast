import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AnimatedHeading from "../../Shared/Animations/AnimatedHeading";
import testimonialImage from '../../assets/Vector.png'
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Company A",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Profast Courier made our delivery process so much easier and faster. Highly recommend!",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Marketing Head, Company B",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Reliable and efficient service with great customer support. Love working with Profast!",
  },
  {
    id: 3,
    name: "Ahmed Khan",
    role: "Operations Manager, Company C",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    text: "The tracking feature is amazing. I always know where my parcels are in real-time.",
  },
  {
    id: 3,
    name: "Ahmed Khan",
    role: "Operations Manager, Company C",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    text: "The tracking feature is amazing. I always know where my parcels are in real-time.",
  },
  {
    id: 3,
    name: "Ahmed Khan",
    role: "Operations Manager, Company C",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    text: "The tracking feature is amazing. I always know where my parcels are in real-time.",
  },
  {
    id: 3,
    name: "Ahmed Khan",
    role: "Operations Manager, Company C",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    text: "The tracking feature is amazing. I always know where my parcels are in real-time.",
  },
];

const TestimonialCarousel = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
        <img src={testimonialImage} alt="testimonialImage" className="max-w-sm mx-auto" />
      <h2 className="text-3xl font-bold text-center mb-3">
        <AnimatedHeading text={"    What Our Clients Say"} />
      </h2>
      <p className="text-center mb-3">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map(({ id, name, role, photo, text }) => (
          <SwiperSlide key={id}>
            <div className="bg-base-100 rounded-lg p-6 shadow-md flex flex-col items-center text-center space-y-4">
              <img
                src={photo}
                alt={name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <p className="text-gray-700 italic">"{text}"</p>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCarousel;
