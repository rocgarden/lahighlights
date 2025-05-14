// app/api/edit-item/[id]/route.js
//import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
//import Post from "@/models/Post";
//import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
//import { updateItem, deleteItem, getItemById } from '@/services/itemService';

// const s3 = new S3Client({
//   region: process.env.S3_REGION,
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_KEY,
//   },
// });

import { updateItem, deleteItem, getItemById } from "@/services/itemService";
import { getAuthSession } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await getAuthSession();
 
   // 🔐 Restrict access to logged-in users only
  if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }


  // const id = params.id;
  const item = await getItemById(params.id);
  if (!item) {
    return new Response(JSON.stringify({ error: 'Item not found' }), {
      status: 404
    });
  }

  if (item.creator !== session.user.email) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }
  const data = await req.json();
  const updated = await updateItem(params.id, data);
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  const session = await getAuthSession();

   // 🔐 Restrict access to logged-in users only
   if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
     return new Response("Unauthorized", { status: 403 });
   }
  
  const id = params.id;
  const deleted = await deleteItem(id);
  return Response.json({ success: true, deleted });
}


// export async function PUT(req, { params }) {
//   const { id } = params;
//   const body = await req.json();

//   try {
//     await connectDB();

//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           name: body.name,
//           content: body.content,
//           fileUrl: body.fileUrl,
//           mediaType: body.mediaType,
//           //creator: body.creator, // Optional: only update if passed
//           updatedAt: new Date(),
//         },
//       },
//       { new: true }
//     );

//     if (!updatedPost) {
//       return NextResponse.json({ error: "Item not found." }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, item: updatedPost });
//   } catch (error) {
//     console.error("[Edit Item Error]", error);
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     );
//   }
// }

// // DELETE item and its media from S3
// export async function DELETE(req, { params }) {
//   const { id } = params;

//   try {
//     await connectDB();

//     const item = await Item.findById(id);
//     if (!item) {
//       return NextResponse.json({ error: 'Item not found.' }, { status: 404 });
//     }

//     // Delete media from S3 if fileUrl exists
//     if (item.fileUrl) {
//       const key = item.fileUrl.split('.amazonaws.com/')[1]; // extract key from URL

//       const command = new DeleteObjectCommand({
//         Bucket: process.env.S3_BUCKET,
//         Key: key,
//       });

//       await s3.send(command);
//     }

//     // Delete the item from MongoDB
//     await Item.findByIdAndDelete(id);

//     return NextResponse.json({ success: true, message: 'Item deleted.' });
//   } catch (error) {
//     console.error('[DELETE ERROR]', error);
//     return NextResponse.json({ error: 'Failed to delete item.' }, { status: 500 });
//   }
// }
