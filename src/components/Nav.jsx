import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import medico_logo from "../assets/img/medico_logo.png";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";
import { Drawer } from "flowbite-react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar Container */}
      <nav
        className={`fixed z-50 inset-0 mx-auto px-10 md:px-28 h-14 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "bg-bg-secondary shadow-md" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="logo">
          <img src={medico_logo} className="w-24 aspect-auto" alt="Medico Logo" />
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex space-x-6 items-center bg-bg-secondary p-2 rounded-lg ${scrolled ? "shadow-none" : "shadow-lg"}`}>
          <NavLink to="/" className="group px-5">
            HOME
            <div className="bg-primary h-[2px] w-0 group-hover:w-full transition-all duration-150"></div>
          </NavLink>
          <Link to="about" smooth={true} duration={500} offset={-70} className="group px-5">
            ABOUT
            <div className="bg-primary h-[2px] w-0 group-hover:w-full transition-all duration-150"></div>
          </Link>
          <Link to="contact" smooth={true} duration={500} offset={-70} className="group px-5">
            CONTACT
            <div className="bg-primary h-[2px] w-0 group-hover:w-full transition-all duration-150"></div>
          </Link>
          <NavLink to="/login" className="px-5 bg-primary text-bg-primary font-bold rounded-md h-7 shadow-md transition hover:scale-110">
            LOG IN
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsDrawerOpen(true)} className="md:hidden text-primary">
          <Menu size={28} />
        </button>

        {/* Mobile Drawer */}
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} position="left">
          <div className="p-6 w-64 bg-bg-secondary h-full">
            {/* Close Button */}
            <button onClick={() => setIsDrawerOpen(false)} className="absolute top-4 right-4 text-gray-600">
              <X size={30} />
            </button>

            {/* Drawer Navigation Links */}
            <ul className="mt-10 space-y-6 text-lg font-semibold text-gray-800  ">
              <li>
                <NavLink to="/" onClick={() => setIsDrawerOpen(false)} className="block px-5 py-2  hover:text-primary hover:bg-bg-primary hover:rounded-md">
                  HOME
                </NavLink>
              </li>
              <li>
                <Link to="about" smooth={true} duration={500} offset={-70} onClick={() => setIsDrawerOpen(false)} className="block px-5 py-2 hover:text-primary hover:bg-bg-primary hover:rounded-md">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="contact" smooth={true} duration={500} offset={-70} onClick={() => setIsDrawerOpen(false)} className="block px-5 py-2 hover:text-primary hover:bg-bg-primary hover:rounded-md">
                  CONTACT
                </Link>
              </li>
              <li>
                <NavLink to="/login" onClick={() => setIsDrawerOpen(false)} className="block px-5 py-2 bg-primary text-bg-primary rounded-md shadow-md hover:scale-105 transition">
                  LOG IN
                </NavLink>
              </li>
            </ul>
          </div>
        </Drawer>
      </nav>
    </>
  );
};

export default Nav;
