import React from "react";
import { useState, useEffect } from "react";
import about_one from "../assets/img/about-1.png";

const AboutPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`container-md  md:w-full h-full mx-auto md:flex items-center justify-between inset-0 md:px-28 md:py-28 px-10 inset-shadow-xs ${
          scrolled ? "opacity-100" : "opacity-0"
         }`}
      >
        {/* Left Section: About Headline and Paragraph */}
        <div className="about md:w-1/2 flex flex-col justify-center">
          <div className="heading text-xl md:text-4xl font-primary my-5 font-extrabold">
            About US
            <div className="line w-24 md:w-28 h-[3px] bg-primary rounded-sm"></div>
          </div>
          <div className="paragraph">
            <p className="text-wrap md:text-xl ">
              Where compassion meets innovation. Our dedicated team of
              healthcare professionals is committed to providing exceptional
              medical care, advanced treatments, and a patient-centered
              experience. With state-of-the-art facilities and a focus on
              holistic healing, we strive to promote health and well-being for
              all.
            </p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="image md:w-1/2 flex items-center justify-center">
          <img
            src={about_one}
            alt="image of a doctor consulting a patient"
            className="w-full h-auto m-2  "
          />
        </div>
      </div>
    </>
  );
};

export default AboutPage;