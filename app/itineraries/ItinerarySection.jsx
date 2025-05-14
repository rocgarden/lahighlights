"use client";

import { useState, useEffect } from "react";
import ItineraryCard from "../components/itineraryCard";
import FadeInSection from "../components/FadeInSection";

export default function ItinerarySection() {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const res = await fetch("/api/itineraries");
        const data = await res.json();
        setItineraries(data);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, []);

  if (!itineraries?.length) return null;

  return (
    <FadeInSection>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
        🗺️ <span className="text-gradient-animated">Local Itineraries</span>
      </h2>
      <div className="flex flex-col gap-6 sm:flex-row sm:overflow-x-auto sm:scrollbar-thin sm:scrollbar-thumb-white/20">
        {itineraries.map((itinerary) => (
          <div
            key={itinerary._id}
            className="w-full sm:w-[300px] flex-shrink-0"
          >
            {" "}
            <ItineraryCard key={itinerary._id} itinerary={itinerary} />
          </div>
        ))}
      </div>
    </FadeInSection>
  );
}
