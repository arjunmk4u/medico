import * as React from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import ContactInfo from "./components/ContactInfo";

export default function MedicalHomePage() {
  const stats = [
    { count: "150+", label: "experienced staff" },
    { count: "100+", label: "years of excellence" },
    { count: "50+", label: "medical colleges" },
  ];

  return (
    <div className="flex overflow-hidden flex-col items-center bg-white">
      <div className="flex flex-col w-full text-base font-medium tracking-normal text-black rounded-none max-md:max-w-full">
        <Header />
      </div>
      <div className="flex flex-col mt-7 w-full rounded-none max-md:max-w-full">
        <div className="pl-20 w-full bg-slate-100 max-md:pl-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-start self-stretch my-auto w-full font-medium tracking-normal text-black max-md:mt-10 max-md:max-w-full">
                <div className="text-5xl leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
                  "We are committed to your <br />
                  <span className="font-bold text-teal-600">Health</span> &{" "}
                  <span className="font-bold text-teal-600">Well being</span>"
                </div>
                <div className="self-stretch mt-7 text-base leading-6 max-md:max-w-full">
                  MEDICO is a comprehensive medical website designed to
                  streamline healthcare access for users. With an intuitive
                  interface, MEDICO offers a seamless booking feature, enabling
                  patients to schedule appointments with their preferred doctors
                  effortlessly.
                </div>
                <button className="flex gap-2.5 px-2.5 py-4 mt-5 text-xl leading-3 text-center text-white bg-emerald-400 rounded-xl shadow-[3px_4px_9px_rgba(0,0,0,0.25)]">
                  <div className="grow">Explore More</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/e97f16e08c3ae2543e68f0f7173c65230225069b003684cfe61c5d8cfbdb0379?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
                    alt="Arrow icon"
                    className="object-contain shrink-0 aspect-square w-[29px]"
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/2da4a248eb605e81d9c07ef126db0a9a69a9ffe63296f619f9160e5883728c78?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
                alt="Medical professionals"
                className="object-contain grow w-full aspect-[1.1] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col px-px mt-7 max-w-full rounded-none w-[1441px]">
        <div className="flex flex-col pt-24 w-full bg-white max-md:max-w-full">
          <div className="self-center w-full max-w-[1120px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-start self-stretch my-auto tracking-normal text-black max-md:mt-10 max-md:max-w-full">
                  <div className="text-5xl leading-none text-center max-md:text-4xl">
                    About us
                  </div>
                  <div className="flex shrink-0 h-1.5 bg-emerald-400 rounded-[36px] w-[190px]" />
                  <div className="self-stretch mt-5 text-xl font-medium leading-6 max-md:max-w-full">
                    Where compassion meets innovation. Our dedicated team of
                    healthcare professionals is committed to providing
                    exceptional medical care, advanced treatments, and a
                    patient-centered experience. With state-of-the-art
                    facilities and a focus on holistic healing, we strive to
                    promote health and well-being for all.
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/1b2e5b38c9aec4a1189016dea6332c361db4330f08756b00cf289a4f80d18921?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
                  alt="Medical facility"
                  className="object-contain grow w-full aspect-[1.7] max-md:mt-10 max-md:max-w-full"
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col justify-center items-center px-20 py-28 mt-28 w-full bg-slate-100 max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col mb-0 w-full max-w-[1121px] max-md:mb-2.5 max-md:max-w-full">
              <div className="mr-6 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/d4245a180b0a490eb7cccfffe8ab5bc2/4cdbb056c0aaeeca22ffe9991c7a6f7b670dfced03c075b56a88758c7503cc14?apiKey=d4245a180b0a490eb7cccfffe8ab5bc2&"
                      alt="Medical mission"
                      className="object-contain grow w-full aspect-[1.97] max-md:mt-6 max-md:max-w-full"
                    />
                  </div>
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col self-stretch my-auto tracking-normal text-black max-md:mt-10 max-md:max-w-full">
                      <div className="text-4xl font-bold leading-9 max-md:max-w-full">
                        Our Mission : Delivering compassionate, high-quality
                        care and promoting well-being for all
                      </div>
                      <div className="mt-5 text-xl font-medium max-md:mr-2.5 max-md:max-w-full">
                        To provide compassionate, high-quality healthcare
                        through innovation, excellence, and patient-centered
                        care, promoting the well-being of every individual we
                        serve.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="pb-10 mt-7 max-w-full rounded-none w-[1121px] max-md:pr-5">
        <div className="flex gap-5 max-md:flex-col">
          {stats.map((stat, index) => (
            <StatCard key={index} count={stat.count} label={stat.label} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col mt-7 w-full rounded-none max-md:max-w-full">
        <div className="flex flex-col justify-center items-center px-16 py-40 w-full bg-slate-100 max-md:px-5 max-md:py-24 max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between -mb-8 max-w-full w-[920px] max-md:mb-2.5">
            <ContactInfo />
            <div className="flex flex-col items-start self-start tracking-normal text-black">
              <div className="text-5xl leading-none text-center max-md:text-4xl">
                Contact
              </div>
              <div className="flex shrink-0 h-1.5 bg-emerald-400 rounded-[36px] w-[162px]" />
              <address className="self-stretch mt-6 text-2xl leading-8 not-italic">
                Baby memorial <br />
                Mananthavady, wayanad
                <br />
                pin : 682311
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
