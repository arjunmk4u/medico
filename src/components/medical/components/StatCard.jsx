import * as React from "react";

export default function StatCard({ count, label }) {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="text-5xl font-medium tracking-normal text-center text-black leading-[60px] max-md:mt-10 max-md:text-4xl max-md:leading-[56px]">
        {count}
        <br />
        <span className="text-2xl">{label}</span>
      </div>
    </div>
  );
}
