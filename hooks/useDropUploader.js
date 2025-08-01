"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 1024 * 5000; // 5MB

export const useDropUploader = (initialUrl = null) => {
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(initialUrl);
  const [errorStatus, setErrorStatus] = useState(null);
  const [fileInfo, setFileInfo] = useState(initialUrl ?  { fileUrl : initialUrl} : null); // contains S3 URL + media type

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrorStatus("File is too large. Max size is 5MB.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setFiles([file]);
    setPreviewUrl(preview);
    setErrorStatus(null);

    try {
      // Request S3 signed URL
      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const { fileUrl, mediaType } = await res.json();

      // Upload directly to S3
      // const uploadRes = await fetch(uploadUrl, {
      //   method: "PUT",
      //   headers: { "Content-Type": file.type },
      //   body: file,
      // });

      // if (!uploadRes.ok) {
      //   throw new Error("Upload failed");
      // }

      setFileInfo({ fileUrl, mediaType });
    } catch (err) {
      console.error("Upload error:", err);
      setErrorStatus("Upload failed. Please try again.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      "video/*": [".mp4", ".mov", ".webm"],
    },
  });

  const removeFile = () => {
    setFiles([]);
    setPreviewUrl(null);
    setFileInfo(null);
    setErrorStatus(null);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return {
    files,
    previewUrl,
    fileInfo,
    errorStatus,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
  };
};
