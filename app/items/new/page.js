"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDropUploader } from "@/hooks/useDropUploader";
import { useRouter } from "next/navigation";

const NewItem = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  const {
    previewUrl,
    fileInfo,
    errorStatus,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
  } = useDropUploader();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    address: "",
    phoneNumber: "",
    addressLink: "",
    phoneLink: "",
    placeData: "",
    section: "", // <-- added
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creator = session?.user?.email;

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          creator,
          imageUrl: fileInfo?.fileUrl,
          mediaType: fileInfo?.mediaType,
         // placeData: JSON.parse(formData.placeData || "{}"),
        }),
      });

      const result = await res.json();
      console.log("✅ Saved to DB:", result);
      router.push("/");

    } catch (error) {
      console.error("❌ Error saving post:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-red-400 border border-white/10 p-6 mt-25 rounded-lg shadow max-w-2xl mx-auto w-full space-y-6 mb-3 text-white"
    >
      <h2 className="text-2xl font-bold">Create New Post</h2>
      {/* Section Dropdown */}
      <div>
        <label htmlFor="section" className="block mb-1 font-medium">
          Section
        </label>
        <select
          id="section"
          required
          value={formData.section}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, section: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        >
          <option value="">Select section</option>
          <option value="hero">🌟 Hero</option>
          <option value="feed">📰 Feed</option>
          <option value="about">ℹ️ About</option>
          <option value="featured">ℹ️ Featured</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Name"
          required
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block mb-1 font-medium">
          Content- A short description
        </label>
        <textarea
          id="content"
          required
          rows={4}
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label htmlFor="category" className="block mb-1 font-medium">
          Category
        </label>
        <select
          id="category"
          required
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        >
          <option value="">Select a category</option>
          <option value="Cafes">☕ Cafes</option>
          <option value="places">📍 Places</option>
          <option value="events">🎉 Events</option>
          <option value="parks">🌳 Parks</option>
        </select>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block mb-1 font-medium">
          Address
        </label>
        <input
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block mb-1 font-medium">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          pattern="[0-9+ -]*"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* Address Link */}
      <div>
        <label htmlFor="addressLink" className="block mb-1 font-medium">
          Web Address Link
        </label>
        <input
          id="addressLink"
          placeholder="Website Address URL"
          type="url"
          value={formData.addressLink}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, addressLink: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* Phone Link */}
      <div>
        <label htmlFor="phoneLink" className="block mb-1 font-medium">
          Phone Link
        </label>
        <input
          id="phoneLink"
          type="url"
          value={formData.phoneLink}
          placeholder="optional"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phoneLink: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* Place Data (JSON) */}
      <div>
        <label htmlFor="placeData" className="block mb-1 font-medium">
          Place Data (JSON)
        </label>
        <textarea
          id="placeData"
          rows={3}
          value={formData.placeData}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, placeData: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* File Upload */}
      <div
        {...getRootProps()}
        className="border border-dashed border-white/30 p-4 rounded text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Click or drag an image/video here to upload</p>
        )}
      </div>

      {previewUrl && (
        <div className="relative mt-4">
          {fileInfo?.mediaType === "video" ? (
            <video src={previewUrl} controls className="w-full rounded" />
          ) : (
            <img src={previewUrl} alt="preview" className="w-full rounded" />
          )}
          <button
            type="button"
            onClick={removeFile}
            className="absolute top-2 right-2 bg-black/60 text-white text-xl px-2 py-1 rounded hover:bg-red-600 transition"
          >
            x
          </button>
        </div>
      )}

      {errorStatus && <p className="text-red-400 text-sm">{errorStatus}</p>}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
      >
        Submit Post
      </button>
    </form>
  );
};

export default NewItem;
