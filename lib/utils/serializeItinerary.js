export function serializeItinerary(itinerary) {
  const obj = itinerary.toObject(); // flatten Mongoose document
  return {
    ...obj,
    _id: obj._id.toString(),
    createdAt: obj.createdAt.toISOString(),
    highlights: obj.highlights.map((h) => ({
      ...h,
      _id: h._id?.toString?.() ?? undefined,
    })),
  };
}
