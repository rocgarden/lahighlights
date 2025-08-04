// app/api/itineraries/[id]/route.js
import {
  getItineraryById,
  updateItinerary,
  deleteItinerary,
  deleteItineraryBySlug,
  getItineraryBySlug
} from "@/services/itineraryService";
import { getAuthSession } from "@/lib/auth";
import redis from "@/lib/redis";

export async function GET(_, { params }) {
  const itinerary = await getItineraryBySlug(params.slug);
  if (!itinerary) {
    return new Response("Itinerary not found", { status: 404 });
  }
  return Response.json(itinerary);
}

export async function PUT(req, { params }) {
   const session = await getAuthSession();

   if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
     return new Response(JSON.stringify({ error: "Unauthorized" }), {
       status: 403,
     });
  };
  const itinerary = await getItineraryById(params.id);
  if (!itinerary) {
    return new Response(JSON.stringify({ error: "Itinerary not found" }), {
      status: 404,
    });
  }

  if (itinerary.creator !== session.user.email) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }
  
  const data = await req.json();
  const updated = await updateItinerary(params.id, data);

    // ✅ Clear Redis cache after successful update
  await redis.del("itineraries:all");
  await redis.del(`itinerary:${itinerary.slug}`);

  return Response.json(updated);
}

export async function DELETE(_, { params }) {
   const session = await getAuthSession();

   if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
     return new Response(JSON.stringify({ error: "Unauthorized" }), {
       status: 403,
     });
   }

   const itinerary = await getItineraryById(params.id);
   if (!itinerary) {
     return new Response(JSON.stringify({ error: "Itinerary not found" }), {
       status: 404,
     });
   }

   if (itinerary.creator !== session.user.email) {
     return new Response(JSON.stringify({ error: "Forbidden" }), {
       status: 403,
     });
  };
  
  const deleted = await deleteItinerary(params.id);

  await redis.del("itineraries:all");
  if (itinerary.slug) {
    await redis.del(`itineraries:slug:${itinerary.slug}`);
  }

  return Response.json({ success: true, deleted });
}
