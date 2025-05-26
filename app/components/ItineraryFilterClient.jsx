"use client";

import { useState } from "react";
import ItineraryFilterBar from "./ItineraryFilterBar";
import ItineraryGrid from "./ItineraryGrid";

export default function ItineraryFilterClient({ itineraries }) {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  
   const clearFilters = () => {
     setSelectedType("all");
     setSelectedTag("all");
   };

  const filtered = itineraries.filter((i) => {
    const matchesType = selectedType === "all" || i.type === selectedType;
    const tags = i.highlights?.map((h) => h.activity?.toLowerCase()) || [];
    const matchesTag = selectedTag === "all" || tags.includes(selectedTag);
    return matchesType && matchesTag;
  });

  return (
    <>
      <ItineraryFilterBar
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
      />
      {/* Clear Filters Button */}
      {(selectedType !== "all" || selectedTag !== "all") && (
        <div className="mb-4">
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-1.5 rounded-full bg-gray-600 text-white text-sm hover:bg-gray-700 transition"
          >
            ✖ Clear Filters
          </button>
        </div>
      )}
      <ItineraryGrid itineraries={filtered} />
    </>
  );
}
