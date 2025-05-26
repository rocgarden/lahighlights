//services/itineraryService
import connectDB from "@/lib/dbConnect";
import Itinerary from "@/models/Itinerary";
import redis from "@/lib/redis";
import { serializeItinerary } from "@/lib/utils/serializeItinerary";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function generateUniqueSlug(title) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (await Itinerary.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}


let cached = null;
let lastFetched = 0;

// export async function getItineraries() {
//     console.log("Fetching itineraries from DB...");

//   const now = Date.now();
//   const CACHE_DURATION = 60000; //60s

//    if (cached && now - lastFetched < CACHE_DURATION) {
//      return cached;
//    }
  
//   await connectDB();
//   const itineraries = await Itinerary.find().sort({ createdAt: -1 }).lean();
   
//   const formatted = itineraries.map((itinerary) => ({
//     ...itinerary,
//     _id: itinerary._id.toString(),
//     highlights: itinerary.highlights?.map((h) => ({
//       ...h,
//       _id: h._id?.toString?.() ?? null,
//         activity: h.activity || "",
//     place: h.place || "",
//     timeOfDay: h.timeOfDay || "",
//     day: h.day || 1,
//     addressLink: h.addressLink || "",
//   })) || [],
//     createdAt: itinerary.createdAt.toISOString(), // optional: serialize Date
//   }));
//   cached = formatted;
//   lastFetched = now;

//   return formatted;
// }

//***** getItineraries using Redis cache /serialized db data
export async function getItineraries() {
  await connectDB();

  const cacheKey = "itineraries:all";
  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("itineraries cache hit");
    return JSON.parse(cached);
  }
    console.log("itineraries db hit");

  const results = await Itinerary.find({});
  const serialized = results.map(serializeItinerary);

  await redis.set(cacheKey, JSON.stringify(serialized), "EX", 3600); // cache 1 hr

  return serialized;
}


export async function createItinerary(data) {
  await connectDB();
  const slug = await generateUniqueSlug(data.title);
  return await Itinerary.create({ ...data, slug });
}

export async function getItinerariesByCreator(creatorEmail) {
  await connectDB();
  return Itinerary.find({ creator: creatorEmail }).sort({ createdAt: -1 });
}

export async function getItineraryById(id) {
  await connectDB();
  return await Itinerary.findById(id);
}

export async function getItineraryBySlug(slug) {
  await connectDB();
  return await Itinerary.findOne({slug});
}

export async function updateItinerary(id, data, slug) {
  await connectDB();
  return await Itinerary.findByIdAndUpdate(id, data,slug,  { new: true });
}

// Extract S3 object key from URL
function getS3KeyFromUrl(url) {
  const match = url.match(/\/([^\/]+\/[^\/]+)$/); // matches "folder/filename.ext"
  return match ? match[1] : null;
}

export async function deleteItinerary(id) {
  await connectDB();

  const itinerary = await Itinerary.findById(id);
  if (!itinerary) throw new Error("Itinerary not found");

  // Get S3 key from file URL
  const s3Key = getS3KeyFromUrl(itinerary.fileUrl);
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

  // Delete from DB
  await Itinerary.findByIdAndDelete(id);
  return { success: true, message: "Itinerary and media deleted." };
}

export async function deleteItineraryBySlug(slug) {
  await connectDB();

  const itinerary = await Itinerary.findOne({ slug });
  if (!itinerary) throw new Error("Itinerary not found");

  const s3Key = getS3KeyFromUrl(itinerary.fileUrl);
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

  await Itinerary.findOneAndDelete({ slug });
  return { success: true, message: "Itinerary and media deleted." };
}
