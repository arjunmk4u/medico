import React from "react";
import CountUp from 'react-countup';
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ArchivementCol = () => {
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 100);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const { ref, inView } = useInView({
      triggerOnce: true, // Ensures it animates only once
      threshold: 0.9, // Triggers when 50% of the component is visible
    });
  return (
    <>
      <div ref={ref} className="container container-md h-full my-20 md:my-0 md:w-full mx-auto space-y-5 md:flex items-center justify-between inset-0 text-center md:px-28 md:py-16 px-10">
        <div className="experience py-5 ">
          <div className="count text-4xl font-bold">{inView ? <CountUp  end={150} /> : 0}+</div>
          <div className="text md:text-xl">experienced staff</div>
        </div>
        <div className="excellence py-5">
          <div className="count text-4xl font-bold">{inView ? <CountUp  end={100} /> : 0}+</div>
          <div className="text md:text-xl">years of excellence</div>
        </div>
        <div className="branches py-5 ">
          <div className="count text-4xl font-bold">{inView ? <CountUp  end={50} /> : 0}+</div>
          <div className="text md:text-xl">medical colleges</div>
        </div>
      </div>
    </>
  );
};

export default ArchivementCol;
