// lib/utils/serializeItinerary.js
export function serializeItinerary(itinerary) {
  const obj =
    typeof itinerary.toObject === "function" ? itinerary.toObject() : itinerary;

  return {
    ...obj,
    _id: obj._id?.toString(),
    createdAt: obj.createdAt?.toISOString?.() || null,
    highlights: (obj.highlights || []).map((h) => ({
      ...h,
      _id: h._id?.toString?.() ?? undefined,
    })),
  };
}
