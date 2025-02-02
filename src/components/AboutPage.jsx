import React from 'react'
import { useState, useEffect } from "react";
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
        <div className={`container-md w-100 h-screen px-10  ${scrolled ? "opacity-100" : "opacity-0"} `}>
            <div className="heading text-xl font-primary font-bold w-24">
                About US
                <hr className=''/>
            </div>
        </div>
    </>
  )
}

export default AboutPage