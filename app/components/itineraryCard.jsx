"use client";

import Link from "next/link";

const typeBadges = {
  solo: "🧍 Solo",
  couple: "💕 Couple",
  family: "👪 Family",
  general: "🌍 General",
};

export default function ItineraryCard({ itinerary }) {
  const { _id, title, city, description, duration, type, fileUrl, mediaType, highlights,slug } =
    itinerary;

  return (
    <div className="bg-red-400 backdrop-blur-lg p-4 rounded-lg border border-white/10 w-[300px] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300">
      {/* Media */}
      {fileUrl && (
        <div className="w-full h-48 rounded-md overflow-hidden mb-3">
          {mediaType === "video" ? (
            <video
              src={fileUrl}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={fileUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Title & City */}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-white/70 text-sm">{city}</p>

      {/* Tags for Duration & Type */}
      <div className="flex items-center gap-2 mt-2 text-sm flex-wrap">
        {duration && (
          <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
            ⏱️ {duration}
          </span>
        )}
        {type && (
          <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded capitalize">
            {typeBadges[type] || "🌍 General"}
          </span>
        )}
      </div>

      {/* Description */}
      {/* <p className="text-white/80 text-sm mt-2 line-clamp-3">{description}</p> */}
      {/*highlights */}
      {highlights?.length > 0 && (
        <ul className="text-white text-md mt-2 space-y-1">
          <p className="text-indigo-900 text-md font-semibold mt-2 line-clamp-3">✨ Highlights</p>

          {highlights.slice(0, 3).map((item, idx) => (
            <li key={idx}>• {item.activity}</li>
          ))}
          {highlights.length > 3 && <li>• ...</li>}
        </ul>
      )}

      {/* View Link */}
      <Link
        href={`/itineraries/${slug}`}
        className="block mt-4 text-blue-300 hover:underline text-md"
      >
        View Full Itinerary →
      </Link>
    </div>
  );
}
