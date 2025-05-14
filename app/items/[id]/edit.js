"use client";

import { useDropUploader } from "@/hooks/useDropUploader";
//import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const EditItem = ({ item }) => {
  const { data: session } = useSession();

  // Load existing data from item
  const [formData, setFormData] = useState({
    name: item.name,
    content: item.content,
  });

  const {
    previewUrl,
    fileInfo,
    errorStatus,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
  } = useDropUploader(item.fileUrl); // Pass existing image/video URL

  const handleSubmit = async (e) => {
    e.preventDefault();
   const creator = session?.user?.email;

    const res = await fetch(`/api/items/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        creator,
        fileUrl: fileInfo?.fileUrl || item.fileUrl, // fallback to original
        mediaType: fileInfo?.mediaType || item.mediaType,
      }),
    });

    const result = await res.json();
    console.log("📝 Updated item:", result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="Name"
      />

      <textarea
        value={formData.content}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, content: e.target.value }))
        }
        placeholder="Content"
      />

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the new file here...</p>
        ) : (
          <p>Click or drag to replace</p>
        )}
      </div>

      {previewUrl && (
        <div className="preview">
          {fileInfo?.mediaType === "video" ? (
            <video src={previewUrl} controls width={250} />
          ) : (
            <img src={previewUrl} alt="preview" width={250} />
          )}
          <button type="button" onClick={removeFile}>
            Remove
          </button>
        </div>
      )}

      {errorStatus && <p style={{ color: "red" }}>{errorStatus}</p>}

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditItem;
