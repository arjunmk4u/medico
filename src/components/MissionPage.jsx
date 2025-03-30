import React from "react";
import { motion } from "framer-motion";
import about_one from "../assets/img/about-3_01.png";
import about_two from "../assets/img/about-4.png";

const MissionPage = () => {
  return (
    <>
      {/* Mission Section */}
      <motion.div
        className="container-md md:w-full h-full shadow-xl bg-bg-primary flex-row-reverse mx-auto md:flex items-center justify-between inset-0 md:px-28 md:py-28 px-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Left Section: Mission Text */}
        <motion.div
          className="about md:w-1/2 flex flex-col justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="heading text-xl md:text-3xl font-primary my-3 font-semibold">
            <span className="text-primary font-extrabold">Our Mission</span>: Delivering compassionate, high-quality care and promoting well-being for all
          </div>
          <div className="paragraph">
            <p className="text-wrap text-sm md:text-xl">
              To provide compassionate, high-quality healthcare through innovation, excellence, and patient-centered care, promoting the well-being of every individual we serve.
            </p>
          </div>
        </motion.div>

        {/* Right Section: Mission Image */}
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
      </motion.div>

      {/* Vision Section (Commented Out) */}
      {/* Uncomment this part if you want the vision section animated as well */}
      {/*
      <motion.div
        className="container-md md:w-full h-full bg-bg-primary mx-auto md:flex items-center justify-between inset-0 md:px-28 md:py-28 px-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          className="about md:w-1/2 flex flex-col justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="heading text-xl md:text-3xl font-primary my-3 font-bold">
            Transforming healthcare with AI-driven solutions for accurate, efficient, and personalized care
          </div>
          <div className="paragraph">
            <p className="text-wrap text-sm md:text-xl ">
              Revolutionizing healthcare with AI-powered solutions for accurate diagnoses, personalized treatments, and improved patient outcomes
            </p>
          </div>
        </motion.div>

        <motion.div
          className="image md:w-1/2 flex md:h-[300px] object-cover overflow-hidden items-start space-x-10 -my-2  justify-center "
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={about_two}
            alt="image of a doctor consulting a patient"
            className="w-full h-auto md:-m-10 m-4"
          />
        </motion.div>
      </motion.div>
      */}
    </>
  );
};

export default MissionPage;
