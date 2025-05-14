"use client";

import { useState } from "react";
import { getPhrasingForActivity } from "@/lib/utils/phrasingForActivity";

export default function DayTimeline({ day, highlights }) {
   const [open, setOpen] = useState(true);
   
  return (
    <div className="mb-10">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-white text-2xl font-semibold underline mb-2 flex items-center justify-between"
      >
        🗓️ Day {day}
        <span className="text-sm text-white/60">
          {open ? "Collapse ▲" : "Expand ▼"}
        </span>
      </button>

      { open && (
        <>
          <p className="text-lg text-white mb-6">What Your Day {day} Looks Like:</p>

          <div className="relative border-l border-white/30 pl-6 space-y-8">
            { highlights.length === 0? (
                <p className="text-white/60">No highlights found for this day.</p>
            ): (
            highlights.map((highlight, idx) => {
            const phrasing = getPhrasingForActivity(highlight.activity);

              return (
                <div key={idx} className="relative">
                  <span className="absolute -left-2 top-1 w-3 h-3 bg-white rounded-full"></span>
                  <div className="text-white ">
                    <div className="text-sm text-indigo-300 uppercase mx-3 tracking-wide mb-1">
                      {highlight.timeOfDay &&
                        `${
                          highlight.timeOfDay[0].toUpperCase() +
                          highlight.timeOfDay.slice(1)
                        }`}
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {phrasing} {highlight.activity}
                    </div>
                    <div className="text-white/70">
                      📍{" "}
                      <a
                        href={
                          highlight.addressLink ||
                          `https://www.google.com/maps/search/${highlight.place}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-400"
                      >
                        {highlight.place}
                      </a>
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
