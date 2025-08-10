"use client";

import { useState } from "react";

const typeOptions = ["all", "family", "solo", "couple", "general", "friends"];
const tagOptions = [
  "all",
  "museum",
  "hike",
  "beach",
  "brunch",
  "coffee",
  "shopping",
]; // You can customize this

export default function ItineraryFilterBar({
  selectedType,
  onTypeChange,
  selectedTag,
  onTagChange,
}) {
  return (
    <div className="space-y-4 mb-6">
      {/* Type Filter */}
      <div className="space-y-2">
        <p className="text-sm text-red-500 mt-4">Search by type or tag</p>
        <div className="overflow-x-auto flex gap-2 pb-1">
          {typeOptions.map((type) => (
            <button
              type="button"
              key={type}
              onClick={(e) => {
                e.preventDefault();
                onTypeChange(type);
              }}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap font-medium border transition
              ${
                selectedType === type
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white/10 text-indigo-900 border-indigo-600 hover:bg-white/20"
              }`}
            >
              {type === "all" ? "🌎 All" : `🔖 ${type}`}
            </button>
          ))}
        </div>

        {/* Tag Filter */}
        <div className="overflow-x-auto flex gap-2 pb-1">
          {tagOptions.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={(e) => {
                e.preventDefault();
                onTagChange(tag);
              }}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap font-medium border transition
              ${
                selectedTag === tag
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white/10 text-indigo-900 border-pink-600 hover:bg-white/20"
              }`}
            >
              {tag === "all" ? "🧭 All Activities" : `🏷️ ${tag}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
