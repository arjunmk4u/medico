import React from "react";
import { useState, useEffect } from "react";
import about_one from "../assets/img/about-3_01.png";
import about_two from "../assets/img/about-4.png";

const MissionPage = () => {
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
      {/* mission */}
      <div
        className={`container-md md:w-full h-full bg-bg-primary flex-row-reverse mx-auto md:flex items-center justify-between inset-0 md:px-28 md:py-28 px-10 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left Section: About Headline and Paragraph */}
        <div className="about md:w-1/2 flex flex-col justify-center">
          <div className="heading text-xl md:text-3xl font-primary my-3 font-bold">
            Our Mission : Delivering compassionate, high-quality care and
            promoting well-being for all
          </div>
          <div className="paragraph">
            <p className="text-wrap text-sm md:text-xl">
              To provide compassionate, high-quality healthcare through
              innovation, excellence, and patient-centered care, promoting the
              well-being of every individual we serve.
            </p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="image md:w-1/2 flex items-center justify-center">
          <img
            src={about_one}
            alt="image of a doctor consulting a patient"
            className="w-full h-auto m-2"
          />
        </div>
      </div>

      {/* vision */}
      <div
        className={`container-md md:w-full h-full bg-bg-primary mx-auto md:flex items-center justify-between inset-0 md:px-28 md:py-28 px-10 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left Section: About Headline and Paragraph */}
        <div className="about md:w-1/2 flex flex-col justify-center">
          <div className="heading text-xl md:text-3xl font-primary my-3 font-bold">
            Transforming healthcare with AI-driven solutions for accurate,
            efficient, and personalized care
          </div>
          <div className="paragraph">
            <p className="text-wrap text-sm md:text-xl ">
              Revolutionizing healthcare with AI-powered solutions for accurate
              diagnoses, personalized treatments, and improved patient outcomes
            </p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="image md:w-1/2 flex items-center justify-center ">
          <img
            src={about_two}
            alt="image of a doctor consulting a patient"
            className="w-full h-auto  m-2"
          />
        </div>
      </div>
    </>
  );
};

export default MissionPage;
