import React from "react";
import { NavLink } from "react-router-dom";
import medico_logo from "../assets/img/medico_logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";



// handling scroll for bg color change 

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>

    {/* nav items  */}

      <nav
        className={`container-md  md:block mx-auto py-3  inset-0 px-10 md:px-28 h-14 fixed transition-all ease-in-out duration-500 ${
          scrolled ? "bg-bg-secondary shadow-md" : "bg-transparent"
        }  `}
      >
        <div className="navbar flex item-center justify-between">
          <div className="logo ">
            <img src={medico_logo} className="w-24 aspect-auto " alt="" />
          </div>

        {/* nav buton for mobile devices */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary"
          >
            {isOpen ? <X size={30} /> : <Menu size={28} className="font-bold text-xl" />}
          </button>
          <div
            id="navbar-default"
            className={`nav-items  hidden md:flex h-full p-2 transition-all ease-in-out duration-500 rounded-md shadow-md ${
              scrolled ? "bg-bg-secondary shadow-none" : "bg-bg-secondary"
            } `}
          >

            {/* normal view nav  */}

            <Link to="Home" smooth={true} duration={500} offset={-70}   className="px-5 group " aria-current="page">
              HOME
              <div className=" bg-primary h-[2px] w-0 transition-all hover:animate-ping ease-out group-hover:w-full duration-150"></div>
            </Link>
            <Link to ="about" smooth={true} duration={500} offset={-70} className="px-5 group">
              ABOUT
              <div className=" bg-primary h-[2px] w-0 transition-all  ease-out group-hover:w-full duration-150"></div>
            </Link>
            <Link to ="contact" smooth={true} duration={500} offset={-70}  className="px-5 group">
              CONTACT
              <div className=" bg-primary h-[2px] w-0 transition-all  ease-out group-hover:w-full duration-150"></div>
            </Link>
            <button className="px-5 mx-1 font-bold bg-primary rounded-md h-7 text-bg-primary shadow-md transition delay-100 ease-in-out hover:scale-110 ">
              LOG IN
            </button>
          </div>

            {/* mobile view */}
          
          <div
            className={`fixed inset-0 bg-bg-secondary w-28 text-center h-full flex flex-col items-center justify-start transition-opacity duration-500 ${
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <button
              className="absolute top-5 right-5 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            <ul className="space-y-8 text-2xl">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
