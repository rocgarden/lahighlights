"use client";

import CoffeeIcon from "./icons/CoffeeIcon";
import CameraIcon from "./icons/CameraIcon";
import TheaterIcon from "./icons/TheaterIcon";
import SurfIcon from "./icons/SurfIcon";
import MoviesIcon from "./icons/MoviesIcon";
import CoasterIcon from "./icons/CoasterIcon";
export function BackgroundScatterIcons() {
  // configuration for each icon
  const icons = [
    {
      Icon: CoffeeIcon,
      className:
        "top-4 left-6 w-6 h-6 sm:w-8 sm:h-8 text-orange-300/30 animate-[sway_6s_ease-in-out_infinite]",
    },
    {
      Icon: CoasterIcon,
      className:
        "top-10 left-46 w-6 h-6 sm:w-8 sm:h-8 text-green-300/30 animate-[sway_6s_ease-in-out_infinite]",
    },
    {
      Icon: TheaterIcon,
      className:
        "top-16 right-8 w-8 h-8 sm:w-10 sm:h-10 text-red-300/30 animate-[wiggle_5s_ease-in-out_infinite]",
    },
    {
      Icon: CameraIcon,
      className:
        "bottom-8 left-1/4 w-6 h-6 sm:w-8 sm:h-8 text-gray-400/30 animate-[sway_8s_ease-in-out_infinite]",
    },
    {
      Icon: SurfIcon,
      className:
        "bottom-5 right-32 w-8 h-8 sm:w-12 sm:h-12 text-blue-300/30 animate-[wiggle_7s_ease-in-out_infinite]",
    },
    {
      Icon: MoviesIcon,
      className:
        "top-1/2 left-8 w-7 h-7 sm:w-9 sm:h-9 text-indigo-300/20 animate-[drift_10s_ease-in-out_infinite]",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, className }, i) => (
        <Icon key={i} className={`absolute ${className}`} />
      ))}
    </div>
  );
}
