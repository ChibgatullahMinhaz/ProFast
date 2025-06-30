import React from "react";
import AnimatedHeading from "../../Shared/Animations/AnimatedHeading";
import { MoveUpRight } from "lucide-react";

const Accordion = () => {
  return (
    <div className="my-5 max-w-4xl mx-auto">
      <div className="text-center my-2">
        <AnimatedHeading text={"Frequently Asked Question (FAQ)"} />
        <p className="text-center my-3">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          How do I create an account?
        </div>
        <div className="collapse-content text-sm">
          Click the "Sign Up" button in the top right corner and follow the
          registration process.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
      <div className="text-center my-4  flex justify-center items-center">
        <button className="btn bg-[#CAEB66] rounded-full border-none outline-none">
          See More FAQ’s
        </button>
        <MoveUpRight className="rounded-full bg-[#1F1F1F] text-[#CAEB66] h-8 w-8" />
      </div>
    </div>
  );
};

export default Accordion;
