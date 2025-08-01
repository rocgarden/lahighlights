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
    museum: "Tour a ",
  };
  return phrasingMapping[activity] || "🌍";
}
