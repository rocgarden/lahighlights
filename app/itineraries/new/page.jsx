"use client";

import { useSession } from "next-auth/react";
import { useDropUploader } from "@/hooks/useDropUploader";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewItineraryPage() {
  const router = useRouter();
   const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push("/signin");
      },
    });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    duration: "",
    type: "general",
    highlights: [{ day: 1,activity: "", place: "", timeOfDay: "" }],
  });

  const {
    previewUrl,
    fileInfo,
    errorStatus,
    getRootProps,
    getInputProps,
    removeFile,
  } = useDropUploader();

    const activityTimeMapping = {
      hike: "morning",
      walk: "morning",
      lunch: "afternoon",
      dinner: "evening",
      party: "night",
      themePark: "all day",
      museum: "afternoon",
      movie: "afternoon"
    };

  const durationDayMap = {
    "half-day": 1,
    "full-day": 1,
    "24 hours": 1,
    weekend: 2,
    "3 days": 3,
    "4-day": 4,
    week: 7,
    "1 week": 7,
    custom: 7, // default max for now; you can customize further
  };
  const getMaxNumDays = () => {
    switch (formData.duration) {
      case "half-day":
      case "full-day":
      case "24 hours":
        return 1;
      case "weekend":
        return 2;
      case "3 days":
        return 3;
      case "1 week":
        return 7;
      default:
        return 1;
    }
  };


  const getMaxDays = () => {
    return durationDayMap[formData.duration] || 1;
  };


  const handleHighlightChange = (index, field, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index][field] = value;

    // Automatically set timeOfDay based on activity
    if (field === "activity") {
      const lowerCaseActivity = value.toLowerCase();
      for (let activity in activityTimeMapping) {
        if (lowerCaseActivity.includes(activity)) {
          newHighlights[index].timeOfDay = activityTimeMapping[activity];
          break;
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      highlights: newHighlights,
    }));
  };
    
    
  const handleAddHighlight = () => {
     const maxDays = getMaxDays();
     const lastDay = formData.highlights.length
       ? formData.highlights[formData.highlights.length - 1].day || 1
       : 1;
    const nextDay = Math.min(lastDay + 1, maxDays);
    
    setFormData((prev) => ({
      ...prev,
      highlights: [
        ...prev.highlights,
        { day:nextDay ,activity: "", place: "", timeOfDay: "" },
      ],
    }));
  };

  const handleRemoveHighlight = (index) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      highlights: newHighlights,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


  const maxDays = getMaxNumDays();
  const allDaysValid = formData.highlights.every(
    (h) => h.day && h.day >= 1 && h.day <= maxDays
  );

  if (!allDaysValid) {
    alert(
      `Please make sure all highlights have a valid day (1-${maxDays}) based on the selected duration.`
    );
    return;
  }


    const creator = session?.user?.email;
    const res = await fetch("/api/itineraries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        creator,
        fileUrl: fileInfo?.fileUrl,
        mediaType: fileInfo?.mediaType,
      }),
    });
    if (res.ok) {
      const created = await res.json(); // 👈 Move this here

      alert("Itinerary created!");
      setFormData({
        title: "",
        description: "",
        city: "",
        duration: "",
        type: "general",
        highlights: [{ day: 1, activity: "", place: "", timeOfDay: "" }],
      });
      removeFile();
      router.push(`/itineraries/${created.slug}`); // 👈 Redirect to detail page
    } else {
      alert("Failed to create itinerary");
    }

  };

  if (status === "loading") return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mt-24 bg-red-400 space-y-4 text-white max-w-xl mx-auto rounded-lg"
    >
      <h1 className="text-3xl font-bold mb-4">Create New Itinerary</h1>
      <details className="bg-white/10 p-3 rounded text-sm text-white">
        <summary className="cursor-pointer font-semibold">
          ✅ Tips for a Great Itinerary
        </summary>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Use a clear, specific title (e.g., “48 Hours in Echo Park”)</li>
          <li>Add 2–3 highlights per day</li>
          <li>Include a mix of activities: food, walk, event, etc.</li>
          <li>Upload at least one image or video</li>
          <li>
            Write short, helpful descriptions using keywords with local flair
          </li>
        </ul>
      </details>

      <input
        className="w-full p-2 bg-white/10 rounded"
        placeholder="Title: ex: 24 Hours in L.A., Weekend Getaway Plan, Best Routes for..."
        value={formData.title}
        onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
      />

      <input
        className="w-full p-2 bg-white/10 rounded"
        placeholder="City"
        value={formData.city}
        onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
      />

      <select
        className="w-full p-2 bg-white/10 rounded"
        value={formData.duration}
        onChange={(e) =>
          setFormData((p) => ({ ...p, duration: e.target.value }))
        }
      >
        <option value="">Select Duration</option>
        <option value="half-day">Half Day</option>
        <option value="full-day">Full Day</option>
        <option value="24 hours">24 Hours</option>
        <option value="weekend">Weekend</option>
        <option value="3 days">3 Days</option>
        <option value="1 week">1 Week</option>
      </select>

      <select
        className="w-full p-2 bg-white/10 rounded"
        value={formData.type}
        onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
      >
        <option value="general">🌍 General</option>
        <option value="solo">🧍 Solo</option>
        <option value="couple">💕 Couple</option>
        <option value="family">👪 Family</option>
      </select>

      <textarea
        className="w-full p-2 bg-white/10 rounded"
        placeholder="Short Description or quick tips specific to the location. "
        rows={5}
        value={formData.description}
        onChange={(e) =>
          setFormData((p) => ({ ...p, description: e.target.value }))
        }
      />

      <div
        {...getRootProps()}
        className="border border-dashed p-4 rounded cursor-pointer bg-white/5 hover:bg-white/10"
      >
        <input {...getInputProps()} />
        <p>Click or drag to upload an image or video</p>
      </div>

      {previewUrl && (
        <div>
          {fileInfo?.mediaType === "video" ? (
            <video src={previewUrl} controls className="w-full max-w-sm" />
          ) : (
            <img src={previewUrl} alt="preview" className="w-full max-w-sm" />
          )}
          <button
            onClick={removeFile}
            type="button"
            className="text-red-500 text-sm mt-2"
          >
            Remove
          </button>
        </div>
      )}

      {errorStatus && <p className="text-red-500">{errorStatus}</p>}

      {/* Highlights Section */}
      <h3 className="text-xl font-semibold">
        ⚡️ Highlights- Add 2-3 local highlights per day
      </h3>
      {formData.highlights.map((highlight, index) => (
        <div key={index} className="space-y-2 mb-4">
          {/* Multiday input */}
          <select
            className="w-full p-2 bg-white/10 rounded"
            value={highlight.day}
            onChange={(e) =>
              handleHighlightChange(index, "day", parseInt(e.target.value))
            }
          >
            <option value="">Select Day</option>
            {[...Array(getMaxDays())].map((_, i) => (
              <option key={i} value={i + 1}>
                Day {i + 1}
              </option>
            ))}
          </select>
          {/* Activity Input */}
          <select
            className="w-full p-2 bg-white/10 rounded"
            value={highlight.activity}
            onChange={(e) =>
              handleHighlightChange(index, "activity", e.target.value)
            }
          >
            <option value="">Select Activity</option>
            <option value="hike">Hike</option>
            <option value="walk">Walk</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="party">Party</option>
            <option value="themePark">Theme Park</option>
            <option value="museum">Museum</option>
            <option value="event">Special Event</option>
            <option value="movie">Movie</option>
          </select>

          {/* Place Input */}
          <input
            className="w-full p-2 bg-white/10 rounded"
            placeholder="Place URL(e.g., 'Bear Hill')"
            value={highlight.place}
            onChange={(e) =>
              handleHighlightChange(index, "place", e.target.value)
            }
          />

          {/* Time of Day Dropdown */}
          <select
            className="w-full p-2 bg-white/10 rounded"
            value={highlight.timeOfDay || ""}
            onChange={(e) =>
              handleHighlightChange(index, "timeOfDay", e.target.value)
            }
          >
            <option value="">Select Time of Day</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>

          <button
            type="button"
            className="text-white text-sm border p-2"
            onClick={() => handleRemoveHighlight(index)}
          >
            ❌ Remove Highlight
          </button>
        </div>
      ))}

      {/* Add New Highlight Button */}
      <button
        type="button"
        className="bg-green-600 px-4 py-2 m-5 rounded hover:bg-green-700"
        onClick={handleAddHighlight}
      >
        Add Highlight
      </button>

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Itinerary
      </button>
    </form>
  );
}
