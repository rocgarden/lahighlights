import { getAllItems, createItem, getItemsByCreator } from "@/services/itemService";
import { getAuthSession } from "@/lib/auth";

export async function GET(req) {
    try {
   const { searchParams } = new URL(req.url);
   const email = searchParams.get("email");
      console.log("email:: ", email);
      let items = [];
   if (email) {
      items = await getItemsByCreator(email);
   } else {
     items = await getAllItems();
   }

      const publicItems = items.map((item) => ({
        _id: item._id,
        title: item.title,
        content: item.content,
        imageUrl: item.imageUrl,
        category: item.category,
        address: item.address,
        phoneNumber: item.phoneNumber,
        addressLink: item.addressLink, //web address link
        phoneLink: item.phoneLink,
        city: item.city || item.placeData?.city || "",
        createdAt: item.createdAt,
        section: item.section,
        mediaType: item.mediaType,
        creator: item.creator,
      }));
   return Response.json(publicItems);

    } catch (err) {
        console.error("Failed to fetch items:", err);
        return Response.json({ error: 'Failed to retrieve items' }, { status: 500 });
    }
}

export async function POST(req) {
  const session = await getAuthSession();

  // 🔐 Restrict access to logged-in users only
  if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!session || !session.user?.isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }

    
  try {
    const body = await req.json();
    const creator = session.user.email;
      
    const newItem = await createItem(body, creator); // Handles saving to DB
    return Response.json(newItem, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: "Failed to create new post" },
      { status: 500 }
    );
  }
}

