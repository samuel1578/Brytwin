import { motion, useReducedMotion } from "framer-motion";

export default function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="about-hero"
      role="banner"
      className="relative flex items-center justify-center h-[80vh] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
    >
      {/* Optional background image */}
      <div
        className="absolute inset-0 bg-[url('/assets/construction-bg.jpg')] bg-cover bg-center opacity-30"
        aria-hidden="true"
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>

      {/* Content */}
      <motion.div
        className="relative max-w-3xl px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={prefersReducedMotion ? undefined : containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
          variants={childVariants}
        >
          Building Trust, One Project at a Time.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-2 leading-relaxed"
          variants={childVariants}
        >
          We're more than builders — we're partners in shaping communities and skylines.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-2 leading-relaxed"
          variants={childVariants}
        >
          Founded on a shared vision of excellence and integrity, our journey blends hands-on expertise with strategic investment.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-gray-200 leading-relaxed"
          variants={childVariants}
        >
          Every structure we create reflects our commitment to quality, innovation, and lasting impact.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300"
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, 10, 0],
                transition: { repeat: Infinity, duration: 2 },
              }
        }
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
