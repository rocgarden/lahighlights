// utils/itineraryHelpers.js

export const activityOptions = [
  "hike",
  "walk",
  "lunch",
  "dinner",
  "party",
  "themePark",
  "museum",
  "event",
  "movie",
];

export const timeOfDayOptions = [
  "morning",
  "afternoon",
  "evening",
  "night",
];

export const durationDayMap = {
  "half-day": 1,
  "full-day": 1,
  "24 hours": 1,
  weekend: 2,
  "3 days": 3,
  "4-day": 4,
  week: 7,
  "1 week": 7,
  custom: 7,
};

export const activityTimeMapping = {
  hike: "morning",
  walk: "morning",
  lunch: "afternoon",
  dinner: "evening",
  party: "night",
  themePark: "all day",
  museum: "afternoon",
  movie: "afternoon",
};

export const getMaxDays = (duration) => {
  return durationDayMap[duration] || 1;
};

export const autoFillTimeOfDay = (activity = "") => {
  const lower = activity.toLowerCase();
  for (const key in activityTimeMapping) {
    if (lower.includes(key)) return activityTimeMapping[key];
  }
  return "";
};
