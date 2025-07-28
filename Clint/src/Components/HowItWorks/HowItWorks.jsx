import React from "react";
import {
  Package,
  LocateIcon,
  Clock,
  UserPlus2,
  Truck,
  Globe,
  Box,
  HandCoins,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Package size={36} className="text-primary" />,
    title: "Book Your Parcel",
    desc: "Fill in pickup and delivery details and confirm your request.",
  },
  {
    id: 2,
    icon: <LocateIcon size={36} className="text-primary" />,
    title: "Live Tracking",
    desc: "Track your parcel in real-time with our GPS-enabled service.",
  },
  {
    id: 3,
    icon: <Clock size={36} className="text-primary" />,
    title: "Fast Delivery",
    desc: "We ensure same-day or scheduled delivery on your terms.",
  },
  {
    id: 4,
    icon: <UserPlus2 size={36} className="text-primary" />,
    title: "Become a Rider",
    desc: "Earn by joining our rider network with flexible hours.",
  },
  {
    id: 5,
    title: "Express & Standard Delivery",
    desc:
      "We deliver parcels within 24–72 hours in major cities. Express delivery in Dhaka within 4–6 hours.",
    icon: <Truck size={36} className="text-primary" />,
  },
  {
    id: 6,
    title: "Nationwide Delivery",
    desc:
      "Home delivery available in every district with delivery within 48–72 hours.",
    icon: <Globe size={36} className="text-primary" />,
  },
  {
    id: 7,
    title: "Fulfillment Solution",
    desc:
      "Inventory management, online order processing, packaging, and after-sales support.",
    icon: <Box size={36} className="text-primary" />,
  },
  {
    id: 8,
    title: "Cash on Home Delivery",
    desc:
      "100% cash on delivery anywhere in Bangladesh with product safety assurance.",
    icon: <HandCoins size={36} className="text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

            {/* Tooltip and Truncated Text */}
            <div className="tooltip  tooltip-bottom" data-tip={step.desc}>
              <p className="text-gray-600 text-sm line-clamp-2">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
