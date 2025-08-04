import EditItinerary from "@/app/components/EditItinerary";
import { getItineraryBySlug } from "@/services/itineraryService";
import { notFound } from "next/navigation";

export default async function EditItineraryPage({ params }) {
  const { slug } = params;

  try {
    const itinerary = await getItineraryBySlug(slug);
    return <EditItinerary itinerary={itinerary} />;
  } catch (err) {
    console.error("Error loading itinerary:", err);
    notFound();
  }
}
