import { getAuthSession } from "@/lib/auth";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4"];

export async function POST(req) {
  const session = await getAuthSession();

  if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
    return new Response("Unauthorized", { status: 403 });
  }
  const { filename, fileType } = await req.json();
 
  if (!allowedTypes.includes(fileType)) {
   return new Response("Unsupported file type", { status: 400 });
  };
  
  const fileExt = filename.split(".").pop();
  const key = `uploads/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: fileType,
    //ACL: "public-read", // or private if needed
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return Response.json({
    uploadUrl: signedUrl,
    fileUrl: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`,
  });
}
