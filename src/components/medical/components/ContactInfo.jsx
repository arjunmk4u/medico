import * as React from "react";

export default function ContactInfo() {
  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-4 text-2xl tracking-normal leading-none text-center text-black">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/0ea9bd92c731c3c2c4fac6e14ccfe175c78b12df268ca23dff40b5653e24c54a?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
          alt="Phone icon"
          className="object-contain shrink-0 w-12 aspect-square"
        />
        <div className="my-auto basis-auto">+91 9074099563</div>
      </div>
      <div className="flex gap-3.5 self-stretch mt-5 text-2xl tracking-normal leading-none text-center text-black whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/acc6f61827a236846395a524584ea009911f75b64ecae5fa53d24fdf90c99aa4?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
          alt="Email icon"
          className="object-contain shrink-0 w-12 aspect-square"
        />
        <div className="grow shrink my-auto w-[201px]">babymemorial@ac.in</div>
      </div>
      <div className="mt-7 text-2xl font-semibold tracking-normal leading-none text-center text-black">
        Keep in touch
      </div>
      <div className="flex gap-5 mt-4">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/edd0912fe17bcb9a50f4018e991590c9e46d7951fa4e32cdb0cf5c6810807c52?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
          alt="Social media icon"
          className="object-contain shrink-0 w-12 aspect-square"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/76422193299f7865bc4c6f83a7105dfdcfe845d627b60aefa4a0a4edc6805b63?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
          alt="Social media icon"
          className="object-contain shrink-0 w-12 aspect-square"
        />
      </div>
    </div>
  );
}
