import React from "react";
import Marquee from "react-fast-marquee";

// Sample logos (replace with your actual logos)
import logo1 from "../../assets/brands/amazon.png";
import logo2 from "../../assets/brands/amazon_vector.png";
import logo3 from "../../assets/brands/casio.png";
import logo4 from "../../assets/brands/moonstar.png";
import logo5 from "../../assets/brands/randstad.png";
import logo6 from "../../assets/brands/start-people 1.png";
import logo7 from "../../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const SalesTeamsSection = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-color-cycle">
        We've helped thousands of&nbsp;
        <span className="text-primary">sales teams</span>
      </h2>

      {/* Marquee logos */}
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="flex "
      >
        {logos.concat(logos).map((logo, idx) => (
          <div
            key={idx}
            className="flex items-center gap-x-7 justify-center min-w-[120px]"
          >
            <img
              src={logo}
              alt={`Company logo ${idx + 1}`}
              className="max-h-16 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default SalesTeamsSection;
