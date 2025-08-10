"use client";

import { useSession } from "next-auth/react";
import { useDropUploader } from "@/hooks/useDropUploader";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { activityOptions, timeOfDayOptions, getMaxDays, autoFillTimeOfDay } from "@/lib/utils/itinerariesHelpers";


export default function EditItinerary({itinerary}) {
     console.log( "editing itinerary:: ",itinerary)
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  const [formData, setFormData] = useState({
    title: itinerary.title,
    description: itinerary.description,
    city: itinerary.city,
    duration: itinerary.duration,
    type: itinerary.type,
    highlights: (itinerary.highlights || []).map(h => ({ ...h, tip: h.tip || "" }))
  });

  const {
    previewUrl,
    fileInfo,
    errorStatus,
    getRootProps,
    getInputProps,
    removeFile,
  } = useDropUploader(itinerary.fileUrl);

    const handleHighlightChange = (index, field, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index][field] = value;

    if (field === "activity") {
        newHighlights[index].timeOfDay = autoFillTimeOfDay(value);
    }

    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
    };


  const handleAddHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, { day: 1, activity: "", place: "", timeOfDay: "", tip:"" }],
    }));
  };

  const handleRemoveHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/itineraries/${itinerary._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        creator: session?.user?.email,
        fileUrl: fileInfo?.fileUrl || itinerary.fileUrl,
        mediaType: fileInfo?.mediaType || itinerary.mediaType,
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      router.push(`/itineraries/${updated.slug}`);
    } else {
      alert("Failed to update itinerary");
    }
  };

  return (
  <form onSubmit={handleSubmit} className="p-6 bg-yellow-500 rounded max-w-xl mx-auto mt-24">
  <h1 className="text-2xl font-bold mb-4">Edit Itinerary</h1>

  <input
    className="w-full p-2 border rounded bg-white/10 text-lg text-white mb-4"
    placeholder="Title"
    value={formData.title}
    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
  />

  {formData.highlights.map((highlight, index) => (
    <div key={index} className="bg-white/5 p-4 border shadow-lg rounded mb-4 space-y-2">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-bold block text-white">Day:</label>
          <input
            type="number"
            value={highlight.day}
            onChange={(e) => handleHighlightChange(index, "day", Number(e.target.value))}
            placeholder="Day"
            className="w-full p-2 bg-white/10 shadow border rounded text-white"
          />
        </div>
        <div className="flex-1">
          <label className="font-bold block text-white">Activity:</label>
         <select
            className="shadow rounded text-white text-sm border p-2 bg-white/10 space-x-4 width-full"
            value={highlight.activity}
            onChange={(e) => handleHighlightChange(index, "activity", e.target.value)}
            >
            <option value="">Select Activity</option>
            {activityOptions.map((option) => (
                <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
            ))}
            </select>

        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-bold block text-white">Place:</label>
          <input
            value={highlight.place}
            onChange={(e) => handleHighlightChange(index, "place", e.target.value)}
            placeholder="Place"
            className="w-full p-2 bg-white/10 shadow border rounded text-white"
          />
        </div>
        <div className="flex-1">
        <label className="font-bold block text-white">Time of Day:</label>
        <select
            className="shadow rounded text-white text-sm border p-2 bg-white/10 space-x-4 width-full"
        value={highlight.timeOfDay}
        onChange={(e) => handleHighlightChange(index, "timeOfDay", e.target.value)}
        >
        <option value="">Select Time of Day</option>
        {timeOfDayOptions.map((option) => (
            <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
        ))}
        </select>

        </div>
      </div>
        <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-bold block text-white">Tip:</label>
          <input
            value={highlight.tip}
            onChange={(e) => handleHighlightChange(index, "tip", e.target.value)}
            placeholder="Tip: (optional)"
            className="w-full p-2 bg-white/10 shadow border rounded text-white"
          />
        </div>
      
      </div>

      <div className="text-right">
        <button
          type="button"
          onClick={() => handleRemoveHighlight(index)}
          className="text-red-400 hover:text-red-600 text-sm mt-2"
        >
          ❌ Remove
        </button>
      </div>
    </div>
  ))}

  <div className="flex gap-4">
    <button
      type="button"
      onClick={handleAddHighlight}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
    >
      ➕ Add Highlight
    </button>

    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
    >
      💾 Save Changes
    </button>
  </div>
</form>

  );
}
