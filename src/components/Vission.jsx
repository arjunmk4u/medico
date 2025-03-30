import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import about_two from "../assets/img/about-4.png";

const Vission = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures animation runs only once
    threshold: 0.3, // Triggers when 30% of the component is visible
  });

  return (
    <motion.div
      ref={ref}
      className="container-md md:w-full h-full shadow-xl bg-bg-primary mx-auto md:flex items-center justify-between inset-0 md:px-28 md:py-28 px-10"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Left Section: About Headline and Paragraph */}
      <motion.div
        className="about md:w-1/2 flex flex-col justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <div className="heading text-xl md:text-3xl font-primary my-3 font-bold">
          Transforming healthcare with{" "}
          <span className="text-primary">AI-driven solutions</span> for accurate,
          efficient, and personalized care
        </div>
        <div className="paragraph">
          <p className="text-wrap text-sm md:text-xl">
            Revolutionizing healthcare with AI-powered solutions for accurate
            diagnoses, personalized treatments, and improved patient outcomes.
          </p>
        </div>
      </motion.div>

      {/* Right Section: Image */}
      <motion.div
        className="image md:w-1/2 flex md:h-[300px] object-cover overflow-hidden items-start space-x-10 -my-2 justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        <img
          src={about_two}
          alt="image of a doctor consulting a patient"
          className="w-full h-auto md:-m-10 m-4"
        />
      </motion.div>
    </motion.div>
  );
};

export default Vission;
