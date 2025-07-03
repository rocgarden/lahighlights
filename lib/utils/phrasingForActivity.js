// Helper function to get phrasing
export function getPhrasingForActivity(activity) {
  const phrasingMapping = {
    hike: "🥾 Explore with a nice ",
    run: "🏃🏻 Run",
    Run: "🏃🏻 Run",
    walk: "🗺️ Explore",
    lunch: "🍽️ Have a pleasant ",
    Lunch: "Have ",
    dinner: "🍽️ Enjoy dinner ",
    party: "🥳 Attend a party",
    Comedy: "🎭 Spend the",
    comedy: "🎭 Laugh it up ",
    event: "🎤 Enjoy the",
    themePark: "🎢 Spend Time at a ",
    movie: "🎥 Watch A ",
  };
  return phrasingMapping[activity] || "🌍";
}
