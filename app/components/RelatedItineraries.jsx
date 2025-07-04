"use client"
import Link from "next/link";

export default function RelatedItineraries({ items =[]}) {
  if (!items?.length) return null;
  return (
    <section className="mt-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        🧭 More Like This
      </h2>
      <ul className="grid sm:grid-cols-2 gap-6">
        {items.map((itinerary) => (
          <li
            key={itinerary._id}
            className="bg-white/10 p-4 rounded-lg text-white hover:bg-white/20 transition"
          >
            <Link
              href={`/itineraries/${itinerary.slug}`}
              className="block bg-white/10 p-4 rounded-lg text-white hover:bg-white/20 transition"
            >
              <h3 className="text-xl font-semibold">{itinerary.title}</h3>
              <p className="text-white/70 text-sm mt-1">{itinerary.city}</p>
              {itinerary.fileUrl && (
                <img
                  src={itinerary.fileUrl}
                  alt={itinerary.title}
                  className="mt-3 w-full h-40 object-cover rounded"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
