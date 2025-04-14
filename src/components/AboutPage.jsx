import React from "react";
import { motion } from "framer-motion";
import about_one from "../assets/img/about-1.png";

const AboutPage = () => {
  return (
    <div className="container-md md:w-full h-full mx-auto md:flex items-center justify-between inset-0 md:px-28 md:py-28 px-10 overflow-hidden">
      {/* Left Section: About Text */}
      <motion.div
        className="about md:w-1/2 flex flex-col justify-center"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="heading text-xl md:text-4xl font-primary my-5 font-extrabold">
          About US
          <div className="line w-24 md:w-28 h-[3px] bg-primary rounded-sm"></div>
        </div>
        <div className="paragraph">
          <p className="text-wrap md:text-xl">
            Where compassion meets innovation. Our dedicated team of healthcare
            professionals is committed to providing exceptional medical care,
            advanced treatments, and a patient-centered experience. With
            state-of-the-art facilities and a focus on holistic healing, we
            strive to promote health and well-being for all.
          </p>
        </div>
      </motion.div>

      {/* Right Section: Image */}
      <motion.div
        className="image md:w-1/2 flex items-center justify-center"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src={about_one}
          alt="image of a doctor consulting a patient"
          className="w-full h-auto m-2"
        />
      </motion.div>
    </div>
  );
};

export default AboutPage;
