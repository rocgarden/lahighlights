// app/api/itineraries/creator/[email]/route.js
import { getItinerariesByCreator } from "@/services/itineraryService";

export async function GET(_, { params }) {
  const itineraries = await getItinerariesByCreator(params.email);
  return Response.json(itineraries);
}
