import React from "react";
import bg from "../assets/img/bg.png";
import { BsArrowRightCircle } from "react-icons/bs";

function LandingPage() {
  return (
    <>
      <div className="container-md h-full xl:flex items-center flex-row-reverse xl:w-full xl:h-full overflow-hidden bg-bg-primary  ">
        <div className="right-side xl:w-full xl:h-screen ">
          <img
            src={bg}
            alt="Image of a doctor holding a sthethescope"
            className="h-full object-cover overflow-visible "
          />
        </div>
        <div className="left-side mx-auto px-10 md:px-28 inset-0 ">
          <div className="title font-primary font-semibold text-3xl my-3 md:text-6xl">
            "We are committed to your{" "}
            <span className="font-extrabold text-primary transition-transform ease-in-out hover:scale-110 hover:animate-bounce ">
              Health
            </span>{" "}
            & <span className="font-bold text-primary">Well-being.</span>"
          </div>
          <p className="md:text-xl  float-left md:my-6 ">
            <span className="font-bold">MEDICO</span> is a comprehensive medical
            website designed to streamline healthcare access for users. With an
            intuitive interface, MEDICO offers a seamless booking feature,
            enabling patients to schedule appointments with their preferred
            doctors effortlessly.
          </p>
          <button className="group bg-primary h-auto my-2 p-2 rounded-md  text-bg-secondary  text-center flex items-center justify-around shadow-md transition  duration-300 ease-in-out  hover:scale-110">
            Explore More{" "}
            <BsArrowRightCircle className="w-auto h-full text-center mx-3 py-2 text-bold animate-pulse transition-all duration-100  group-hover:translate-x-1 " />
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
