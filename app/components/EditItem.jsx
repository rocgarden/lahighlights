"use client";

import { useDropUploader } from "@/hooks/useDropUploader";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const EditItem = ({ item }) => {
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | "success" | "error"
  const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/signin");   
        }
  })

  // Load existing data from item
  const [formData, setFormData] = useState({
    title: item.title,
    content: item.content,
    fileUrl: item.imageUrl,
    section: item.section,
    category: item.category,
    address: item.address,
    addressLink: item.addressLink
  });
 console.log( "editing item:: ",{item})
  const {
    files,
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
    setLoading(true);
    setSubmissionStatus(null);
    const creator = session?.user?.email;
   
    if (files.length > 0 && !fileInfo?.fileUrl) {
      setLoading(false);
      setSubmissionStatus("error");
      alert("Please wait for the files to upload");
      return;
    };
    const { title, content, category, section, address, addressLink } =
      formData;
    try {
      const updatedItem = {
        title,
        content,
        category,
        section,
        creator,
        fileUrl: fileInfo?.fileUrl || item.fileUrl,
        imageUrl: fileInfo?.fileUrl || item.imageUrl,
        mediaType: fileInfo?.mediaType || item.mediaType,
      };
      const res = await fetch(`/api/items/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (!res.ok) throw new Error("Failed to update item");

      setSubmissionStatus("success");
      router.push("/my-posts"); // or wherever you want
    } catch (err) {
      console.error("Edit error:", err);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
    // const res = await fetch(`/api/items/${item._id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     ...formData,
    //     creator,
    //     fileUrl: fileInfo?.fileUrl || item.fileUrl, // fallback to original
    //     mediaType: fileInfo?.mediaType || item.mediaType,
    //   }),
    // });
    //   if (res.ok) {
    //       const updated = await res.json();
    //       console.log("✅ Updated item:: ", updated);
    //       alert("Post updated successfully!");
    //       router.push("/my-posts");
    //   } else {
    //       console.error("❌ Failed to update item.");
    // }
  };

  return (
    <div className="w-full max-w-2xl bg-yellow-400 rounded mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <h3 className="font-bold text-xl py-2 ">Edit Title</h3>
        <input
          type="text"
          maxLength={100}
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Name"
          className="w-full p-2 border rounded bg-white/10 text-lg text-white"
        />
        <h3 className="font-bold text-lg py-2">Edit Section</h3>
        {/* <textarea
          value={formData.section}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Section"
          className="w-full p-2 rounded border bg-white/10 text-white"
        /> */}
        <select
          id="section"
          required
          value={formData.section}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, section: e.target.value }))
          }
          className="w-full p-2 rounded  bg-white/10 border"
        >
          <option value="">Select section</option>
          <option value="hero">🌟 Hero</option>
          <option value="feed">📰 Feed</option>
          <option value="about">ℹ️ About</option>
          <option value="featured">ℹ️ Featured</option>
        </select>
        <h3 className="font-bold text-lg py-2">Edit Description</h3>
        <textarea
          maxLength={300}
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="Content"
          className="w-full p-2 rounded border bg-white/10 text-white"
        />
        <p className="text-sm text-white/60">{formData.content.length}/300</p>
        <h3 className="font-bold text-lg py-2">Edit Category</h3>
        <select
          id="category"
          required
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full p-2 rounded bg-white/10 border"
        >
          <option value="">Select a category</option>
          <option value="Cafes">☕ Cafes</option>
          <option value="places">📍 Places</option>
          <option value="events">🎉 Events</option>
          <option value="parks">🌳 Parks</option>
        </select>
        <h3 className="font-bold text-lg py-2">Edit Address</h3>
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
          placeholder="Address"
          className="w-full p-2 rounded border bg-white/10 text-white"
        />
        <h3 className="font-bold text-lg py-2">Edit Web Address</h3>
        <textarea
          value={formData.addressLink}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, addressLink: e.target.value }))
          }
          placeholder="Web Address"
          className="w-full p-2 rounded border bg-white/10 text-white"
        />
        <h3 className="font-bold text-lg py-2">Edit Image</h3>
        <img
          src={formData.fileUrl}
          alt={formData.name}
          className="w-full h-72 object-cover border rounded-lg mb-6"
        />
        <div
          {...getRootProps()}
          className="border border-dashed border-white p-4 rounded text-white cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the new file here...</p>
          ) : (
            <p>Click or drag new image/file to replace</p>
          )}
        </div>
        {previewUrl && (
          <div className="mt-4">
            {fileInfo?.mediaType === "video" ? (
              <video src={previewUrl} controls width={250} />
            ) : (
              <img src={previewUrl} alt="preview" width={250} />
            )}
            <button
              type="button"
              onClick={removeFile}
              className="text-red-400 text-sm mt-2"
            >
              Remove File
            </button>
          </div>
        )}
        {errorStatus && <p className="text-red-500">{errorStatus}</p>}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 my-2 w-full rounded"
        >
          Save Changes
        </button>{" "}
      </form>
      {loading && <p className="text-blue-500 font-bold m-5">Updating item...</p>}
      {submissionStatus === "success" && (
        <p className="text-green-600 font-bold m-5">Item updated successfully!</p>
      )}
      {submissionStatus === "error" && (
        <p className="text-red-600 font-bold m-5">Something went wrong. Please try again.</p>
      )}
    </div>
  );
};

export default EditItem;