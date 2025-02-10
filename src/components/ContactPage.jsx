import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const ContactPage = () => {
  return (
    <>
      <div className="container-md inset-0 md:px-28 md:py-20 px-10  bg-bg-primary ">
        <div className="text flex justify-center items-center text-3xl font-semibold"></div>
        <div className="contact-section  md:flex justify-between items-center ">
          <div className="left-side flex-row ">
            <div className="phone flex">
              <FaPhoneAlt className="text-center m-1" /> 9656197355
            </div>
            <div className="mail flex">
              <IoIosMail className="text-center m-1 text-xl" />{" "}
              arjunmk4u@gmail.com
            </div>
            <div className="social">
              <div className="title text-2xl font-semibold ">Keep in touch</div>
              <div className="icons flex  text-3xl">
                <FaFacebookSquare className="" />
                <FaInstagramSquare className="mx-1 " />
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="titile">
              <div className="text text-3xl font-semibold">
                Contact <hr className="w-full h-[2px] bg-primary" />
              </div>
            </div>
            <div className="addrress">
              <p>
                Baby Memorial Hospital <br />
                Vazhachal P.O <br />
                Thrissur 
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
