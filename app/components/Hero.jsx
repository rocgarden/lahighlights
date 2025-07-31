import Image from "next/image";
import FadeInSection from "./FadeInSection";
import CarouselWithText from "./CarouselWithText";
// components/Hero.js
export default function Hero({ slides }) {
  return (
    <div className=" px-4 pt-16  bg-gradient-to-r from-pink-900 via-pink-500 to-rose-400 bg-size-200 animate-gradientMove text-white">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row items-center gap-1">
          {/* Left Column */}
          <div className="block md:hidden w-full overflow-hidden mt-2">
            <div className="grid grid-cols-3 gap-0">
              {[...Array(3)].map((_, colIdx) => (
                <div key={colIdx} className="relative h-18">
                  <h1 className="absolute top-0 left-1 text-2xl font-bold leading-none whitespace-nowrap animate-pulse mix-blend-overlay">
                    LOS ANGELES
                  </h1>
                  <h1 className="absolute top-4 -left-15 text-2xl font-bold leading-none text-white/40 whitespace-nowrap animate-pulse mix-blend-overlay">
                    HIGHLIGHTS
                  </h1>
                  <h1 className="absolute top-8 left-10 text-2xl font-bold leading-none whitespace-nowrap animate-pulse  mix-blend-overlay">
                    LOS ANGELES
                  </h1>
                  <h1 className="absolute top-12 -left-12 text-2xl font-bold leading-none text-white/40 whitespace-nowrap animate-pulse mix-blend-overlay">
                    HIGHLIGHTS
                  </h1>
                </div>
              ))}
            </div>
            <div className="absolute flex flex-col inset-0 z-10 justify-center items-center text-center w-full text-white p-1  ">
              <h1 className="text-2xl font-bold text-center text-white mt-2 backdrop-blur-sm">
                Los Angeles Attractions for Tourists and Natives
              </h1>
              <p className="lg:text-2xl text-white text-lg text-center m-2">
                Scroll-worthy spots & how to enjoy 'em! 🎯{" "}
              </p>
            </div>
          </div>

          <div className="hidden md:block w-full md:w-7/12 text-center md:text-left">
            <h1 className="text-4xl  md:text-[85px] lg:text-[145px] font-bold mb-4 outline-text leading-none">
              LOS
            </h1>
            <h1 className="text-4xl md:text-[85px] lg:text-[145px] font-bold -mt-8 md:-mt-20 px-2 leading-none">
              ANGELES
            </h1>
            <h1 className="text-4xl md:text-[85px] lg:text-[145px]  font-bold -mt-3 md:-mt-14 lg:-mt-20 -z-10 mb-4 outline-text leading-none">
              LOS
            </h1>
            <h1 className="text-4xl  md:text-[85px] lg:text-[145px]  font-bold -mt-8 md:-mt-14 lg:-mt-20 mb-4 px-2 leading-none">
              ANGELES
            </h1>
            <p className="text-2xl mt-4">
              Your L.A. starter pack — spots, snaps & hidden gems. 🌴{" "}
            </p>
          </div>

          {/* Right Column */}
          <div className="relative w-full md:w-5/12 ">
            <CarouselWithText slides={slides} />
          </div>

          {/* Text Section */}
          {/* <div className="md:w-1/2 flex flex-col justify-between">
                  <small className="text-sm text-gray-600 mb-1">
                    From April 1, 2025
                  </small>
                  <h2 className="text-xl font-semibold mb-2">
                    🎶 Song Challenge
                  </h2>
                  <h3 className="text-md mb-4">
                    Create a page inspired by your favorite song.
                  </h3>
                  <a
                    href="/contests"
                    className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-700 transition"
                  >
                    Open to votes
                  </a>
                </div> */}
        </div>
      </div>
    </div>
  );
}
