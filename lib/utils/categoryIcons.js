// lib/utils/categoryIcons.js

const categoryEmojis = {
  cafes: "☕",
  places: "📍",
  events: "🎉",
  music: "🎵",
  art: "🎨",
  default: "📌",
};

export function getCategoryEmoji(category = "") {
  const slug = category.toLowerCase().trim();

  return categoryEmojis[slug] || categoryEmojis.default;
}
