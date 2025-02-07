import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <>
      <div className="container-md inset-0 md:px-28 md:py-20 px-10  bg-bg-primary ">
        <div className="text flex justify-center items-center text-3xl font-semibold"></div>
        <div className="contact-section md:flex justify-between items-center ">
          <div className="left-side">
            <FaPhoneAlt /> 9656197355
          </div>
          <div className="right-side">
            <div className="text text-3xl font-semibold">
              Contact
              <div className="line w-full h-[3px] bg-primary rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
