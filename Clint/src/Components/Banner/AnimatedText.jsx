import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const colors = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

const AnimatedText = ({ text }) => {
  const controls = useAnimation();

  useEffect(() => {
    async function animateColors() {
      while (true) {
        for (const color of colors) {
          await controls.start({
            color: color,
            transition: { duration: 1 },
          });
        }
      }
    }
    animateColors();
  }, [controls]);

  return (
    <motion.h1
      animate={controls}
      style={{ fontSize: "2.5rem", fontWeight: "bold" }}
    >
      {text}
    </motion.h1>
  );
};

export default AnimatedText;
