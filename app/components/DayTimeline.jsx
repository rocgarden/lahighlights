"use client";

import { useState } from "react";
import { getPhrasingForActivity } from "@/lib/utils/phrasingForActivity";

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
        className="w-full text-left text-yellow-400 text-2xl font-semibold  mb-2 flex items-center justify-between"
      >
        🗓️ Day {day}
        <span className="ml-2 text-sm text-white/60 whitespace-nowrap">
          {open ? "Collapse ▲" : "Expand ▼"}
        </span>
      </button>

      {open && (
        <>
          <p className="text-base sm:text-lg text-white mb-6">
            What Your Day {day} Looks Like:
          </p>

          <div className="relative border-l border-black/80 bg-white/10 rounded-lg px-5 py-5 pl-4 sm:pl-6 space-y-8">
            {highlights.length === 0 ? (
              <p className="text-white/60">No highlights found for this day.</p>
            ) : (
              highlights.map((highlight, idx) => {
                const phrasing = getPhrasingForActivity(highlight.activity);
                const activity = formatActivityName(highlight.activity);

                return (
                  <div key={idx} className="relative px-3">
                    {/* <span className="absolute -left-2 top-1 w-3 h-3 bg-white rounded-full"></span> */}
                    <span className="absolute -left-3 top-0 text-lg">⏱️</span>
                    <div className="text-white ">
                      <div className=" sm:text-xl text-yellow-400 font-semibold uppercase tracking-wide mb-1">
                        {highlight.timeOfDay &&
                          `${
                            highlight.timeOfDay[0].toUpperCase() +
                            highlight.timeOfDay.slice(1)
                          }`}
                      </div>

                      <div>
                        <div className="text-lg sm:text-xl font-semibold text-white">
                          {phrasing} {activity}
                        </div>
                        <p className="text-white break-words">
                          📍{" "}
                          <a
                            href={
                              highlight.addressLink ||
                              `https://www.google.com/maps/search/${highlight.place}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" hover:text-blue-500"
                          >
                            {highlight.place}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
