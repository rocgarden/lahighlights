"use client";

import { useState } from "react";
import { getPhrasingForActivity, getIconForTimeOfDay } from "@/lib/utils/phrasingForActivity";

export default function DayTimeline({ day, highlights }) {
  const [open, setOpen] = useState(true);

  function formatActivityName(str) {
    if (!str) return "";
    return  str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Split camelCase
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase()); // Capitalize first letters
  };



  return (
    <div className="mb-10">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-yellow-400 text-2xl font-semibold mb-4 flex items-center justify-between"
      >
        🗓️ Day {day}
        <span className="ml-2 text-sm text-white/60">
          {open ? "Collapse ▲" : "Expand ▼"}
        </span>
      </button>

      {open && (
        <div className="bg-white/10 rounded-r-xl border-l border-black shadow-inner p-4 sm:p-6 space-y-4">
          {highlights.length === 0 ? (
            <p className="text-white/60">No highlights for this day.</p>
          ) : (
            highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start sm:items-center gap-4 hover:bg-white/10 rounded-lg p-3 sm:p-4 transition-colors"
              >
                {/* Icon or image */}
               <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-[2rem] sm:text-[2.25rem] leading-none">
                    {getIconForTimeOfDay(highlight.timeOfDay)}
                  </span>
                </div>


                {/* Content */}
                <div className="flex-1 text-white">
                  <div className="text-lg text-yellow-400 font-bold mb-1">
                    {highlight.timeOfDay?.[0].toUpperCase() + highlight.timeOfDay?.slice(1)}
                  </div>
                  <div className="text-base mb-1">
                    {getPhrasingForActivity(highlight.activity)} {highlight.activity}
                  </div>
                  <div className="text-md text-white/80 leading-snug">
                    <span>➤</span>{" "}
                    <a
                      href={
                        highlight.addressLink ||
                        `https://www.google.com/maps/search/${highlight.place}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-blue-500"
                    >
                      {highlight.place}
                    </a>
                  </div>
                 {highlight.tip && (
                    <div className="mt-2 text-xs text-white/90 italic">
                      💡 {highlight.tip}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
