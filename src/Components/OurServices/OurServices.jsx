import React from "react";
import {
  Truck,
  Globe,
  Box,
  HandCoins,
  Warehouse,
  RotateCcw,
} from "lucide-react";
import AnimatedText from "../Banner/AnimatedText";

const services = [
  {
    id: 1,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <Truck size={36} className="text-primary" />,
  },
  {
    id: 2,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <Globe size={36} className="text-primary" />,
  },
  {
    id: 3,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <Box size={36} className="text-primary" />,
  },
  {
    id: 4,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <HandCoins size={36} className="text-primary" />,
  },
  {
    id: 5,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <Warehouse size={36} className="text-primary" />,
  },
  {
    id: 6,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <RotateCcw size={36} className="text-primary" />,
  },
];

const OurServices = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 my-4 bg-[#03373D] rounded-xl">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl text-gray-100 font-bold mb-2">
          <AnimatedText text={"Our Services"} />
        </h2>
        <p className="text-gray-100 max-w-2xl mx-auto">
          We offer fast, flexible and reliable courier & logistics solutions
          across Bangladesh.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg hover:bg-[#caeb66] transition"
          >
            <div className="mb-4 flex justify-center ">
              <div className="rounded-full p-3 bg-gradient-to-tr from-cyan-700 via-blue-300 to-purple-600">
                <span>{service.icon}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
