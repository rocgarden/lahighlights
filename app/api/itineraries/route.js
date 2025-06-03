// GET all or by query, POST new itinerary
//api/itineraries/route
import { getAuthSession } from "@/lib/auth";
import { getItineraries, createItinerary } from "@/services/itineraryService";
import redis  from "@/lib/redis";

export async function GET(req) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city");
  const itineraries = await getItineraries(city);
   const filtered = city
     ? itineraries.filter((i) => i.city?.toLowerCase() === city.toLowerCase())
     : itineraries;  


  return Response.json(filtered);
}

export async function POST(req) {
  const session = await getAuthSession();

  if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
    return new Response("Unauthorized", { status: 403 });
  };
  
  try {
    const data = await req.json();
    const newItinerary = await createItinerary(data);

    // ✅ Invalidate cache
    await redis.del("itineraries:all");
    if (newItinerary.slug) {
      await redis.del(`itineraries:slug:${newItinerary.slug}`);
    }

    return Response.json(newItinerary, { status: 201 });
  } catch (err) {
    return Response.json(
      console.log(err),
      { error: "Failed to create itinerary" },
      { status: 500 }
    );
  }
}
