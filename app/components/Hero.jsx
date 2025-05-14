import Image from "next/image";
import FadeInSection from "./FadeInSection";
import CarouselWithText from "./CarouselWithText";
// components/Hero.js
export default function Hero() {
  return (
    <div className="moving-max-gradient px-4 py-16 bg-gradient-to-r from-pink-900 via-pink-500 to-rose-400 bg-size-200 animate-gradient-x text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Column */}
          <div className="w-full md:w-7/12 text-center md:text-left">
            <h1 className="text-4xl md:text-[145px] font-bold mb-4 outline-text leading-none">
              LOS
            </h1>
            <h1 className="text-4xl md:text-[145px] font-bold -mt-8 md:-mt-20 px-2 leading-none">
              ANGELES
            </h1>
            <h1 className="text-4xl md:text-[145px] font-bold -mt-3 md:-mt-20 -z-10 mb-4 outline-text leading-none">
              LOS
            </h1>
            <h1 className="text-4xl md:text-[145px] font-bold -mt-8 md:-mt-20 mb-4 px-2 leading-none">
              ANGELES
            </h1>
            <p className="text-2xl mt-4">
              Favorite places to visit and tips to get around! 🚕
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-5/12">
          <CarouselWithText/>
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
