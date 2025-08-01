import { getAuthSession } from "@/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"]; // quicktime = .mov

export async function POST(req) {
  const session = await getAuthSession();

  if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
    return new Response("Unauthorized", { status: 403 });
  }

  const contentType = req.headers.get("content-type") || "";
  const isImage = allowedImageTypes.includes(contentType);
  const isVideo = allowedVideoTypes.includes(contentType);

  if (!isImage && !isVideo) {
    return new Response("Unsupported file type", { status: 400 });
  }

  const fileBuffer = await req.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  const fileExt = isImage ? "webp" : contentType.split("/")[1]; // .webp or .mp4 etc.
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  let uploadBuffer = buffer;
  let contentEncoding;

  if (isImage) {
    // Resize and convert to WebP
    uploadBuffer = await sharp(buffer)
      .resize({ width: 1200 }) // You can change width as needed
      .webp({ quality: 80 })
      .toBuffer();
    contentEncoding = "binary";
  }

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: uploadBuffer,
    ContentType: isImage ? "image/webp" : contentType,
    ContentEncoding: contentEncoding,
  });

  await s3.send(command);

  const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;

  return Response.json({
    success: true,
    fileUrl,
    mediaType: isImage ? "image" : "video",
  });
}
