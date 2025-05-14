export function generateItineraryMetadata(itinerary, slug) {
  if (!itinerary) {
    return {
      title: "Itinerary Not Found | Norah Bird",
      description:
        "This itinerary could not be found. Try exploring other curated trips.",
    };
  }

  const { title, city, description, fileUrl, highlights } = itinerary;

  const hasDescription = description?.trim().length > 0;
  const fallbackActivities = highlights
    ?.slice(0, 2)
    .map((h) => `${h.activity} at ${h.place}`)
    .join(", ");

  const metaDescription = hasDescription
    ? description
    : `Explore a curated itinerary in ${city} featuring ${fallbackActivities} and more.`;

  return {
    title: `${title} in ${city} | Local Itineraries | Norah Bird`,
    description: metaDescription,
    openGraph: {
      title: `${title} in ${city} | Norah Bird`,
      description: metaDescription,
      url: `https://norahbird.com/itineraries/${slug}`,
      images: fileUrl
        ? [
            {
              url: fileUrl,
              width: 1200,
              height: 630,
              alt: `${title} in ${city}`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} in ${city} | Norah Bird`,
      description: metaDescription,
      images: fileUrl ? [fileUrl] : [],
    },
  };
}
