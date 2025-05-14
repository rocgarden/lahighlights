export function getItineraryTypeIcon(type) {
  const icons = {
    solo: "🧍",
    couple: "💕",
    family: "👨‍👩‍👧",
    general: "🌍",
  };
  return icons[type] || "🌍";
}
