// Helper function to get phrasing
export function getPhrasingForActivity(activity) {
  const phrasingMapping = {
    hike: "🥾 Explore with a nice ",
    run: "🏃🏻 Run",
    Run: "🏃🏻 Run",
    walk: "🗺️ Explore with a nice",
    lunch: "🍽️ Have a pleasant ",
    Lunch: "Have ",
    dinner: "🍽️ Enjoy ",
    party: "🥳 Attend a party",
    Comedy: "🎭 Spend the",
    comedy: "🎭 Laugh it up ",
    event: "🎤 Enjoy a local ",
    themePark: "🎢 Spend Time at a ",
    movie: "🎥 Watch A ",
    museum: "🏛️ Tour a ",
    coffee: "☕️ Catch up with a ",
    brunch: "🍳 Keep calm and ",
    breakfast: "🥞 Wake up to a tasty ",
    shopping: "🛍️ Take a break and go "
  };
  return phrasingMapping[activity] || "🌍";
}

// lib/utils/getIconForActivity.ts
export function getIconForActivity(activity) {
  const icons = {
    coffee: "☕️",
    brunch: "🍳",
    breakfast: "🍳",
    lunch: "🥪",
    dinner: "🍽️",
    museum: "🏛️",
    hike: "🥾",
    arcade: "🕹️",
    park: "🌳",
    zoo: "🦁",
    movie: "🎬",
    shopping: "🛍️",
    beach: "🏖️",
    relax: "🧘‍♀️",
    // fallback
    default: "📍",
  };

  return icons[activity.toLowerCase()] || icons.default;
}

export function getIconForTimeOfDay(time) {
  const map = {
    morning: "☀️",
    afternoon: "🌤️",
    evening: "🌥️ ",
    night: "🌙",
  };
  return map[time.toLowerCase()] || "🕒";
}
