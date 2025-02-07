import React from "react";
import bg from "../assets/img/bg.png";
import { BsArrowRightCircle } from "react-icons/bs";

function LandingPage() {
  return (
    <>
      <div className="container-md h-full md:flex items-center flex-row-reverse md:w-full md:h-screen overflow-hidden bg-bg-primary">
        <div className="right-side md:w-full md:h-screen ">
          <img
            src={bg}
            alt="Image of a doctor holding a sthethescope"
            className="w-full h-auto  md:w-full mx-auto "
          />
        </div>
        <div className="left-side mx-auto px-10 md:px-28 inset-0 ">
          <div className="title font-primary text-3xl my-3 md:text-6xl">
            "We are committed to your{" "}
            <span className="font-bold text-primary transition-transform ease-in-out hover:scale-110  ">
              Health
            </span>{" "}
            & <span className="font-bold text-primary">Well-being.</span>"
          </div>
          <p className="text-md float-left my-1">
            <span className="font-bold">MEDICO</span> is a comprehensive medical
            website designed to streamline healthcare access for users. With an
            intuitive interface, MEDICO offers a seamless booking feature,
            enabling patients to schedule appointments with their preferred
            doctors effortlessly.
          </p>
          <button className="group bg-primary h-auto my-3 p-2 rounded-md  text-bg-secondary  text-center flex items-center justify-around shadow-md transition  duration-300 ease-in-out  hover:scale-110">
            Explore More{" "}
            <BsArrowRightCircle className="w-auto h-full text-center mx-2 py-1 text-bold animate-pulse transition-all duration-100  group-hover:translate-x-1 " />
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
