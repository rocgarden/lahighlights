import  connectDB  from '@/lib/dbConnect';
import Post from "@/models/Post";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import redis  from '@/lib/redis';
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
  const cacheKey = "items:all";
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  await connectDB();
  console.log("🔍 getAllItems fetched from DB at", new Date().toISOString());

  const items = await Post.find().sort({ createdAt: -1 }).lean();

  const serialized = items.map((item) => ({
    ...item,
    _id: item._id.toString(),
    creator: item.creator?.toString() || null,
    createdAt: item.createdAt?.toISOString() || null,
    updatedAt: item.updatedAt?.toISOString() || null,
    imageUrl: item.imageUrl || "/fallback.jpg",
  }));

  await redis.set(cacheKey, JSON.stringify(serialized), "EX", 86400); // 1 day cache

  return serialized;
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

export async function getAllCategories() {
  await connectDB();

  const results = await Post.find({}, "category").lean();
  const categories = Array.from(
    new Set(results.map((item) => item.category?.toLowerCase()).filter(Boolean))
  );

  return categories;
}


// ✅ function to filter by category , cached/serialized
export async function getItemsByCategory(category) {
  await connectDB();

  const cacheKey = `category:${category.toLowerCase()}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const posts = await Post.find({
    category: { $regex: new RegExp(category, "i") },
  })
    .sort({ createdAt: -1 })
    .lean(); // lean for plain JS objects

  const serialized = posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    creator: post.creator?.toString() || null,
    createdAt: post.createdAt?.toISOString() || null,
    updatedAt: post.updatedAt?.toISOString() || null,
  }));

  await redis.set(cacheKey, JSON.stringify(serialized), "EX", 3600); // 1 hour

  return serialized;
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
