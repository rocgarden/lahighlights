// app/api/itineraries/[id]/route.js
import {
  getItineraryById,
  updateItinerary,
  deleteItinerary,
  deleteItineraryBySlug,
  getItineraryBySlug
} from "@/services/itineraryService";
import { getAuthSession } from "@/lib/auth";

export async function GET(_, { params }) {
  const itinerary = await getItineraryById(params.id);
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
  const itinerary = await getItineraryBySlug(params.slug);
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
  const updated = await updateItinerary(params.slug, data);
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
   const session = await getAuthSession();

   if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
     return new Response(JSON.stringify({ error: "Unauthorized" }), {
       status: 403,
     });
   }

   const itinerary = await getItineraryBySlug(params.slug);
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
  
  const deleted = await deleteItineraryBySlug(params.slug);
  return Response.json({ success: true, deleted });
}
