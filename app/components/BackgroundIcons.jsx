"use client";

import { useMemo } from "react";
import CoffeeIcon from "./icons/CoffeeIcon";
import CameraIcon from "./icons/CameraIcon";
import TheaterIcon from "./icons/TheaterIcon";
import SurfIcon from "./icons/SurfIcon";
import MoviesIcon from "./icons/MoviesIcon";

export function BackgroundIcons({  count = 10 }) {
      const iconSet = [CoffeeIcon, TheaterIcon, CameraIcon, SurfIcon, MoviesIcon];
  const scatteredIcons = useMemo(() => {
    return Array.from({ length: count }).map((_, idx) => {
      const Icon = iconSet[idx % iconSet.length];

      // random starting position
      const top = `${Math.floor(Math.random() * 90)}%`;
      const left = `${Math.floor(Math.random() * 90)}%`;

      // random drift offset (CSS var values)
      const tx = `${Math.random() > 0.5 ? "" : "-"}${20 + Math.floor(Math.random() * 40)}px`;
      const ty = `${Math.random() > 0.5 ? "" : "-"}${20 + Math.floor(Math.random() * 40)}px`;

      // random animation duration for variety
      const duration = `${8 + Math.floor(Math.random() * 8)}s`;

      return (
        <Icon
          key={idx}
          className="absolute w-6 h-6 sm:w-8 sm:h-8 text-gray-400/30 animate-drift"
          style={
            {
              top,
              left,
              "--tx": tx,
              "--ty": ty,
              "--duration": duration,
            } 
          }
        />
      );
    });
  }, [iconSet, count]);

  return <>{scatteredIcons}</>;
}
