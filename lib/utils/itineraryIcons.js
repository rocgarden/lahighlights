export function getItineraryTypeIcon(type) {
  const icons = {
    solo: "🧍",
    couple: "💕",
    family: "👨‍👩‍👧",
    general: "🌍",
    friends: "😎",
    work: "🏢"
  };
  return icons[type] || "🌍";
}
