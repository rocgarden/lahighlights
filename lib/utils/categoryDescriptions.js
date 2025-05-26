// lib/utils/categoryTaglines.js

export function getCategoryTagline(category, mode = "full") {
  const taglines = {
    cafes: {
      full: "🥐 Sips, snaps, and cozy corners to vibe out.",
      short: "🥐 Cafés made for sipping, snapping, and settling in.",
    },
    places: {
      full: "📸 Views for the feed, memories for the books.",
      short: "📸 Scenic spots designed for snapshots and strolls.",
    },
    events: {
      full: "🎤 What’s on? IRL fun you don’t want to miss.",
      short: "🎤 Can’t-miss local events.",
    },
    parks: {
      full: "🌿 Touch grass, chill out, explore the green.",
      short: "🌿 Explore the outdoors.",
    },
  };

  const categoryData = taglines[category.toLowerCase()];
  if (!categoryData) {
    return mode === "short"
      ? "🧭 Curated recs for the curious."
      : "🧭 Curated picks for when you just wanna roam.";
  }

  return categoryData[mode] || categoryData.full;
}
