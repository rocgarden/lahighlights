// lib/placeData.js
export async function buildPlaceData(data) {
  let {
    title,
    address,
    phoneNumber,
    addressLink,
    phoneLink,
    category,
    content,
    duration,
    type,
    description,
    highlights,
    city,
  } = data;

  let lat = null;
  let lon = null;

  // 1. Geocode itinerary-level location (address or city)
  // const locationForGeocode = address || city;
  // if (locationForGeocode) {
  //   try {
  //     const res = await fetch(`/api/geocode?address=${encodeURIComponent(locationForGeocode)}`);
  //     const coords = await res.json();
  //     lat = coords.lat;
  //     lon = coords.lon;
  //   } catch (err) {
  //     console.error("Error fetching itinerary coords:", err);
  //   }
  // }

  // 2. Geocode each highlight's `place`
  let processedHighlights = [];
  if (Array.isArray(highlights)) {
    processedHighlights = await Promise.all(
      highlights.map(async (h) => {
        let placeLat = null;
        let placeLon = null;

        if (h.place) {
          try {
            const res = await fetch(`/api/geocode?address=${encodeURIComponent(h.place)}`);
            const coords = await res.json();
            placeLat = coords.lat;
            placeLon = coords.lon;
          } catch (err) {
            console.error(`Error fetching coords for highlight place "${h.place}":`, err);
          }
        }

        return {
          ...h,
          lat: placeLat,
          lon: placeLon,
        };
      })
    );
  }

  return {
    name: title || "",
    address: address || "",
    phone: phoneNumber || "",
    links: {
      website: addressLink || "",
      phone: phoneLink || "",
    },
    category: category || "",
    content: content || "",
    duration: duration || "",
    type: type || "",
    description: description || "",
    city: city || "",
    lat,
    lon,
    highlights: processedHighlights,
  };
}
