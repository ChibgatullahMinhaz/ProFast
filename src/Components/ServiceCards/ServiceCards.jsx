import React from "react";
import call from "../../assets/safe-delivery.png";
import Tracking from "../../assets/live-tracking.png";
import Delivery from "../../assets/tiny-deliveryman.png";
const cards = [
  {
    id: 1,
    illustration: (
      <img src={Tracking} alt="Delivery Illustration" className="w-24 h-24" />
    ),
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    id: 2,
    illustration: (
      <img src={call} alt="Call Center Support" className="w-24 h-24" />
    ),
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
  {
    id: 3,
    illustration: (
      <img src={Delivery} alt="Safe Delivery" className="w-24 h-24" />
    ),
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
];

const ServiceCards = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col space-y-10">
        {cards.map(({ id, illustration, title, description }) => (
          <div
            key={id}
            className="flex items-center flex-col sm:flex-row space-x-6 bg-white rounded-xl p-3"
          >
            {/* Left side: illustration and vertical line */}
            <div className="flex flex-col items-center space-y-4">
              <div>{illustration}</div>
              {/* vertical line height fixed to illustration height */}
            </div>
            <div className="divider divider-horizontal text-white"></div>
            {/* Right side: title and description */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
