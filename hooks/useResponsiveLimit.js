"use client";
import { useState, useEffect } from "react";

export function useResponsiveLimit(mobile = 3, desktop = 5, breakpoint = 768) {
  const [limit, setLimit] = useState(desktop); // default desktop

  useEffect(() => {
    const updateLimit = () => {
      if (window.innerWidth < breakpoint) {
        setLimit(mobile); // mobile
      } else {
        setLimit(desktop); // tablet/desktop
      }
    };

    updateLimit(); // run on mount
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, [mobile, desktop, breakpoint]);

  return limit;
}
