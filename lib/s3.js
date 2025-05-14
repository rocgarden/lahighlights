const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

async function uploadToS3(filename, buffer) {
  const key = `uploads/${Date.now()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: buffer,
    ACL: "public-read",
  });
  await s3.send(command);
  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;
}

module.exports = { uploadToS3 };
