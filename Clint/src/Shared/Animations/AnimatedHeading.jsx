import { motion } from "framer-motion";

const colorCycle = [
  "#EF4444", // red-500
  "#F59E0B", // amber-500
  "#10B981", // green-500
  "#3B82F6", // blue-500
  "#EF4444", // loop back
];

const AnimatedHeading = ({ text }) => {
  return (
    <motion.h2
      className="text-4xl font-bold"
      animate={{ color: colorCycle }}
      transition={{
        duration: 6,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {text}
    </motion.h2>
  );
};

export default AnimatedHeading;
