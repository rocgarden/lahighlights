import  connectDB  from '@/lib/dbConnect';
import Post from "@/models/Post";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

// Create new item
export async function createItem(data, creatorEmail) {
  await connectDB();
  const newItem = new Post({ ...data, creator: creatorEmail });
  await newItem.save();
  return {
    ...newItem.toObject(),
    _id: newItem._id.toString(),
    createdAt: newItem.createdAt?.toISOString() || null,
    updatedAt: newItem.updatedAt?.toISOString() || null,
  };
}

// Get item by ID
export async function getItemById(id) {
  await connectDB();
  const item = await Post.findById(id).lean();
  if (!item) return null;

  return {
    ...item,
    _id: item._id.toString(),
    creator: item.creator?.toString() || null,
    createdAt: item.createdAt?.toISOString() || null,
    updatedAt: item.updatedAt?.toISOString() || null,    
  }
}

export async function updateItem(id, updatedData) {
  await connectDB();
  const updatedDoc = await Post.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedDoc) return null;

  const item = updatedDoc.toObject();

  return {
    ...item,
    _id: item._id.toString(),
    creator: item.creator?.toString() || null,
    createdAt: item.createdAt?.toISOString() || null,
    updatedAt: item.updatedAt?.toISOString() || null,
  };
}


// Get all items
export async function getAllItems() {
  await connectDB();
  const items = await Post.find().sort({ createdAt: -1 }).lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    creator: item.creator?.toString() || null,
    createdAt: item.createdAt?.toISOString() || null,
    updatedAt: item.updatedAt?.toISOString() || null,
    imageUrl: item.imageUrl  || "/fallback.jpg" , // fallback image
  }));
}

//get items by email-creator
export async function getItemsByCreator(email) {
  await connectDB();
  const posts = await Post.find({ creator: email })
    .sort({ createdAt: -1 })
    .lean();
  console.log("email posts:: ", posts);

  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    creator: post.creator?.toString() || null,
    createdAt: post.createdAt?.toISOString() || null,
    updatedAt: post.updatedAt?.toISOString() || null,
    imageUrl: post.imageUrl || "/fallback.jpg",
  }));
}

// ✅ function to filter by category
export async function getItemsByCategory(category) {
  await connectDB();
  const posts = await Post.find({
    category: { $regex: new RegExp(category, "i") },
  })
    .sort({ createdAt: -1 })
    .lean(); // 🔑 Use lean()

  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    creator: post.creator?.toString() || null, // serialize ObjectId
    createdAt: post.createdAt?.toISOString() || null,
    updatedAt: post.updatedAt?.toISOString() || null,
  }));
}


// Extract S3 object key from URL
function getS3KeyFromUrl(url) {
  const match = url?.match(/\/([^\/]+\/[^\/]+)$/); // matches "folder/filename.ext"
  return match ? match[1] : null;
}

// DELETE item and S3 object
export async function deleteItem(id) {
  await connectDB();

  const item = await Post.findById(id);
  if (!item) throw new Error("Item not found");

  // Get S3 file key from stored URL
  const s3Key = getS3KeyFromUrl(item.fileUrl);
  if (s3Key) {
    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: s3Key,
        })
      );
      console.log(`🧹 Deleted from S3: ${s3Key}`);
    } catch (err) {
      console.error("S3 deletion error:", err.message);
    }
  }

  // Delete the item from DB
  await Post.findByIdAndDelete(id);
  return { success: true, message: "Item and file deleted." };
}
