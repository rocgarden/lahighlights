import mongoose from "mongoose";

// Define the schema for a highlight (activity, place, time of day)
const HighlightSchema = new mongoose.Schema({
  day: { type: Number, default: 1 }, // <-- New field
  activity: { type: String, required: true },
  place: { type: String, required: true },
  timeOfDay: {
    type: String,
    enum: ["morning", "afternoon", "evening", "night"],
  }, // Predefined times of day
  tip: { type: String, default: "" }, //optional
});

const ItinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  city: { type: String },
  description: { type: String },
  duration: {
    type: String,
    enum: [
      "half-day",
      "full-day",
      "weekend",
      "3-day",
      "4-day",
      "week",
      "custom",
    ],
  },

  type: { type: String, enum: ["solo", "couple", "family", "general", "friends", "work"] },
  creator: { type: String, required: true }, // user email or ID
  fileUrl: { type: String }, // media (e.g., image or video)
  mediaType: { type: String, enum: ["image", "video"], default: "image" },
  createdAt: { type: Date, default: Date.now },
  highlights: [HighlightSchema], // New field for storing highlights as an array of objects
});

// Ensure slug is always lowercase and URL-safe
ItinerarySchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }
  next();
});

export default mongoose.models.Itinerary ||
  mongoose.model("Itinerary", ItinerarySchema);
