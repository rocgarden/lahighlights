"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 1024 * 5000;
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

const DropZoneUploader = ({ onUploadComplete, initialUrl }) => {
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(initialUrl || null);
  const [errorStatus, setErrorStatus] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];

      if (!allowedTypes.includes(file.type)) {
        setErrorStatus(
          "Unsupported file type. Please upload JPG, PNG, MP4, or WebM."
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setErrorStatus("File is too large. Max size is 5MB.");
        return;
      }

      const mediaType = file.type.split("/")[0];
      const preview = URL.createObjectURL(file);
      setFiles([file]);
      setPreviewUrl(preview);

      // Get presigned URL from API
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, fileType: file.type }),
        });

         if (!res.ok) {
           throw new Error("Server rejected the file.");
        };

        const { uploadUrl, fileUrl } = await res.json();

        await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        onUploadComplete({ fileUrl, mediaType }); // 🔁 Pass to parent
      } catch (err) {
        setErrorStatus("Upload failed.");
        console.error(err);
      }
    },
    [onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "video/*": [".mp4", ".mov", ".webm"],
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag & drop or click</p>
        )}
      </div>

      {previewUrl && (
        <div className="preview mt-4">
          {files[0]?.type?.startsWith("video") ? (
            <video src={previewUrl} controls width={250} />
          ) : (
            <img src={previewUrl} alt="preview" width={250} />
          )}
        </div>
      )}

      {errorStatus && <p style={{ color: "red" }}>{errorStatus}</p>}
    </div>
  );
};

export default DropZoneUploader;

// export default function DropzoneUploader({ onUpload }) {
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "image/*": [],
//       "video/*": [], // Add video support
//     },
//     maxFiles: 1,
//     onDrop: async (files) => {
//       const file = files[0];
//       const res = await fetch("/api/upload-url", {
//         method: "POST",
//         body: JSON.stringify({ filename: file.name, fileType: file.type }),
//         headers: { "Content-Type": "application/json" },
//       });

//       const { uploadUrl, fileUrl } = await res.json();

//       // Upload file directly to S3 using the signed URL
//       await fetch(uploadUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": file.type,
//         },
//         body: file,
//       });

//       onUpload(fileUrl); // Pass final public URL to form
//     },
//   });

//   return (
//     <div {...getRootProps()} className="dropzone">
//       <input {...getInputProps()} />
//       <p>Drag & drop image/video or click to upload</p>
//     </div>
//   );
// }
