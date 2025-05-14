// GET all or by query, POST new itinerary
import { getAuthSession } from "@/lib/auth";
import { getItineraries, createItinerary } from "@/services/itineraryService";

export async function GET(req) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");
  const itineraries = await getItineraries(city);
  return Response.json(itineraries);
}

export async function POST(req) {
  const session = await getAuthSession();

  if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
    return new Response("Unauthorized", { status: 403 });
  };
  
  const data = await req.json();
  const newItinerary = await createItinerary(data);
  return Response.json(newItinerary);
}
