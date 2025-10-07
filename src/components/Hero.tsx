import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// You can replace this with your actual construction site image
const heroBackgroundImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

const Hero: React.FC = () => {
  // Function to handle smooth scrolling when the scroll down button is clicked
  const scrollDown = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const scrollChevronVariants = {
    initial: { opacity: 0.8, y: 0 },
    animate: {
      opacity: [0.8, 0.4, 0.8],
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroBackgroundImage}
          alt="Construction site"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Hero content container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mb-6"
          variants={itemVariants}
        >
          Building Tomorrow's Landmarks Today
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 text-center max-w-2xl mb-10"
          variants={itemVariants}
        >
          Expert construction solutions with precision engineering and uncompromising quality for your residential and commercial projects.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          variants={itemVariants}
        >
          <motion.button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Get a free quote for your construction project"
          >
            Get a Quote
          </motion.button>
          <motion.button
            className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="View our construction projects portfolio"
          >
            View Projects
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-2"
        onClick={scrollDown}
        initial="initial"
        animate="animate"
        variants={scrollChevronVariants}
        aria-label="Scroll down to learn more"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;
