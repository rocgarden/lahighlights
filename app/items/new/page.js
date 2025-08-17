"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useDropUploader } from "@/hooks/useDropUploader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { buildPlaceData } from "@/lib/placeData";

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
    section: "", // <-- added
  });

  const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
   };
  
  
 const getCoordinates = async (address) => {
  if (!address) return { lat: null, lon: null };

  try {
    const res = await fetch(
      `/api/geocode?address=${encodeURIComponent(address)}`,
      { method: "GET" }
    );

    if (!res.ok) {
      console.warn("Geocode API returned error:", await res.text());
      return { lat: null, lon: null };
    }

    const { lat, lon } = await res.json();
    return { lat, lon };
  } catch (err) {
    console.error("Error fetching coords:", err);
    return { lat: null, lon: null };
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    const creator = session?.user?.email;

      // Fetch coordinates from Google Maps API
    //const { lat, lon } = await getCoordinates(formData.address);

      // ✅ Build placeData object automatically
    // const placeData = {
    //   name: formData.title || "",
    //   address: formData.address || "",
    //   phone: formData.phoneNumber || "",
    //   links: {
    //     website: formData.addressLink || "",
    //     phone: formData.phoneLink || "",
    //   },
    //   category: formData.category || "",
    //   content: formData.content || "",
    //   lat,
    //   lon,
      // };
      const placeData = await buildPlaceData(formData);

      
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: formData.section,
          title: formData.title,
          content: formData.content,
          address: formData.address,
          category: formData.category,
          addressLink : formData.addressLink,
          placeData, // ✅ send structured object
          creator,
          imageUrl: fileInfo?.fileUrl || "",
          mediaType: fileInfo?.mediaType || "",
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      const result = await res.json();
      console.log("✅ Saved to DB:", result);
      router.push("/");
    } catch (error) {
      console.error("❌ Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-red-400 border border-white/10 p-6 mt-25 rounded-lg shadow max-w-2xl mx-auto w-full space-y-6 mb-3 text-white"
    >
      <h2 className="text-2xl font-bold">Create New Post</h2>
      <details className="bg-white/10 p-3 rounded text-sm text-white">
        <summary className="cursor-pointer font-semibold">
          ✅ Tips for New Posts
        </summary>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Use Google Maps to get accurate location details</li>
          <li>Copy the google maps directions/phone number and web addess links</li>
          <li>Include a mix of activities: food, walk, event, etc.</li>
          <li>Upload at least one image or video</li>
          <li>
            Write short, helpful descriptions using keywords
          </li>
        </ul>
      </details>
      {/* Section Dropdown */}
      <div>
        <label htmlFor="section" className="block mb-1 font-medium">
          Section on Home Page
        </label>
        <select
          id="section"
          name="section"
          required
          value={formData.section}
          onChange={handleChange}
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
          name="title"
          type="text"
          placeholder="Name"
          required
          value={formData.title}
          onChange={handleChange}
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
          name="content"
          required
          rows={4}
          value={formData.content}
          onChange={handleChange}
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
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        >
          <option value="">Select a category</option>
          <option value="Cafes">☕ Cafes</option>
          <option value="places">📍 Places</option>
          <option value="events">🎉 Events</option>
          <option value="parks">🌳 Parks</option>
          <option value="eats">🍽️ Eats </option>
          <option value="museums">🖼️ Museums</option>

        </select>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block mb-1 font-medium">
          Address- Use Online Directions Link
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
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
          name="phoneNumber"
          type="tel"
          pattern="[0-9+ -]*"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* Website */}
      <div>
        <label htmlFor="addressLink" className="block mb-1 font-medium">
          Web Address Link
        </label>
        <input
          id="addressLink"
          name="addressLink"
          placeholder="Website Address URL"
          type="url"
          value={formData.addressLink}
          onChange={handleChange}
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
          name="phoneLink"
          type="url"
          value={formData.phoneLink}
          placeholder="optional"
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      {/* Place Data (JSON) */}
      {/* <div>
        <label htmlFor="placeData" className="block mb-1 font-medium">
          Place Data (JSON)- Safely Ignore this area
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
      </div> */}

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
            <Image
              src={previewUrl}
              alt="preview"
              width={300}
              height={200}
              className="w-full rounded"
            />
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
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
      >
        {loading ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
};

export default NewItem;
