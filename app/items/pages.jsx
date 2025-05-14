export async function generateMetadata({ params }) {
  await connectDB();
  const itinerary = await Itinerary.findById(params.id);
  if (!itinerary) return { title: "Itinerary Not Found" };

  return {
    title: `${itinerary.title} in ${itinerary.city} | Local Itineraries`,
    description: itinerary.description,
    highlights: itinerary.highlights,
    openGraph: {
      title: itinerary.title,
      description: itinerary.description,
      images: [
        {
          url: itinerary.fileUrl,
          width: 1200,
          height: 630,
          alt: itinerary.title,
        },
      ],
      url: `https://norahbird.com/itineraries/${params.id}`,
    },
  };
}
