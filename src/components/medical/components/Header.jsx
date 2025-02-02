import * as React from "react";

export default function Header() {
  return (
    <div className="flex flex-col justify-center items-center px-16 py-7 w-full bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between w-full max-w-[1111px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/7646674fd554b149266e14ea175fc09236a78854d4c04e1e71a4a2c44aa8e42c?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
          alt="Medical Logo"
          className="object-contain shrink-0 max-w-full aspect-[5.26] w-[168px]"
        />
        <nav className="flex gap-5 items-start my-auto">
          <button className="grow">HOME</button>
          <button>ABOUT</button>
          <button>CONTACT</button>
          <button className="self-stretch px-3 pt-px pb-3.5 text-white bg-emerald-400 rounded-md">
            LOG IN
          </button>
        </nav>
      </div>
    </div>
  );
}
